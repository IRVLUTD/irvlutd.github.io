(function (root) {
  'use strict';
  const data = root.LIBERO_DATA || {};
  const episodes = data.episodes || [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const usd = value => value == null ? '—' : `$${Number(value).toFixed(3)}`;
  const num = value => value == null ? '—' : Number(value).toLocaleString();
  const taskLabel = id => `Task ${Number(id) + 1}`;

  function googleDriveEmbedUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value);
      if (url.hostname !== 'drive.google.com') return null;
      const match = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)/);
      const id = match?.[1] || url.searchParams.get('id');
      return id && /^[A-Za-z0-9_-]+$/.test(id) ? `https://drive.google.com/file/d/${id}/preview` : null;
    } catch {
      return null;
    }
  }

  function setOptions(id, values, allLabel, format = value => value) {
    $(id).innerHTML = `<option value="">${esc(allLabel)}</option>` + values.map(value => `<option value="${esc(value)}">${esc(format(value))}</option>`).join('');
  }

  const models = [...new Set(episodes.map(row => row.model).filter(Boolean))].sort();
  const tasks = [...new Set(episodes.map(row => row.task_id).filter(value => value != null))].sort((a,b) => a-b);
  const efforts = [...new Set(episodes.map(row => row.effort).filter(Boolean))];
  const states = [...new Set(episodes.map(row => row.init_state).filter(value => value != null))].sort((a,b) => a-b);
  setOptions('model-filter', models, 'All models');
  setOptions('task-filter', tasks, 'All tasks', taskLabel);
  setOptions('effort-filter', efforts, 'All reasoning');
  setOptions('state-filter', states, 'All states', value => `State ${value}`);

  function attempted(row) {
    return ['success','failure','incomplete_budget','api_error_usage_unknown','error','usage_unknown'].includes(row.status);
  }

  function filtered() {
    return episodes.filter(row =>
      (!$('model-filter').value || row.model === $('model-filter').value) &&
      (!$('effort-filter').value || row.effort === $('effort-filter').value) &&
      (!$('task-filter').value || String(row.task_id) === $('task-filter').value) &&
      (!$('state-filter').value || String(row.init_state) === $('state-filter').value)
    );
  }

  function table(headers, rows, caption) {
    return `<table class="results-table"><caption class="sr-only">${esc(caption)}</caption><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
  }

  function cells(values) {
    return `<tr>${values.map(value => `<td>${esc(value)}</td>`).join('')}</tr>`;
  }

  function aggregate(rows, key) {
    const groups = new Map();
    rows.forEach(row => {
      const name = key(row);
      const group = groups.get(name) || {attempted:0,success:0,stopped:0,pending:0,cost:0,costKnown:false,calls:0,callsKnown:false};
      if (attempted(row)) {
        group.attempted += 1;
        if (row.success === true) group.success += 1;
        if (!['success','failure'].includes(row.status)) group.stopped += 1;
      } else {
        group.pending += 1;
      }
      if (row.estimated_usd != null) { group.cost += Number(row.estimated_usd) || 0; group.costKnown = true; }
      if (row.api_attempts != null) { group.calls += Number(row.api_attempts) || 0; group.callsKnown = true; }
      groups.set(name, group);
    });
    return [...groups].sort((a,b) => String(a[0]).localeCompare(String(b[0]), undefined, {numeric:true})).map(([name, group]) => cells([
      name,
      `${group.success} / ${group.attempted}`,
      group.attempted ? `${(100 * group.success / group.attempted).toFixed(1)}%` : '—',
      group.stopped,
      group.pending,
      group.costKnown ? usd(group.cost) : '—',
      group.callsKnown ? group.calls : '—'
    ]));
  }

  let chosen = null;

  function draw() {
    const rows = filtered().sort((a,b) => a.task_id-b.task_id || a.init_state-b.init_state || String(a.model).localeCompare(String(b.model)) || String(a.effort).localeCompare(String(b.effort)));
    const done = rows.filter(attempted);
    const successes = done.filter(row => row.success === true).length;
    const stateZero = done.filter(row => row.init_state === 0);
    const stateZeroSuccess = stateZero.filter(row => row.success === true).length;
    const stopped = done.filter(row => !['success','failure'].includes(row.status)).length;
    const costRows = rows.filter(row => row.estimated_usd != null);
    const cost = costRows.reduce((sum,row) => sum + (Number(row.estimated_usd) || 0), 0);

    $('cards').innerHTML = [
      ['Success / attempted', `${successes} / ${done.length}`],
      ['State 0 first pass', `${stateZeroSuccess} / ${stateZero.length}`],
      ['Stopped early', stopped],
      ['Measured API cost', costRows.length ? usd(cost) : '—']
    ].map(([label,value]) => `<article class="summary-card"><small>${esc(label)}</small><strong>${esc(value)}</strong></article>`).join('');

    $('task-stats').innerHTML = table(
      ['Task','Success / attempted','Rate','Stopped early','Pending','Cost','Calls'],
      aggregate(rows, row => taskLabel(row.task_id)),
      'Success and cost grouped by task'
    );
    $('model-stats').innerHTML = table(
      ['Model / reasoning','Success / attempted','Rate','Stopped early','Pending','Cost','Calls'],
      aggregate(rows, row => `${row.model} / ${row.effort}`),
      'Success and cost grouped by model and reasoning'
    );
    $('state-count').textContent = `${rows.length} state rollout${rows.length === 1 ? '' : 's'} shown. Select a row to inspect its evidence.`;
    $('episodes').innerHTML = table(
      ['Model','Reasoning','Task','State','Status','Success','Steps','Calls','Cost','Budget charge'],
      rows.map(row => {
        const index = episodes.indexOf(row);
        const statusClass = row.success === true ? 'status-success' : attempted(row) ? 'status-failure' : '';
        return `<tr class="pick" tabindex="0" role="button" data-index="${index}" aria-selected="${row === chosen}">` +
          `<td>${esc(row.model)}</td><td>${esc(row.effort)}</td><td>${esc(taskLabel(row.task_id))}</td><td>${esc(row.init_state)}</td>` +
          `<td class="${statusClass}">${esc(row.status)}</td><td>${row.success === true ? 'Yes' : attempted(row) ? 'No' : 'Pending'}</td>` +
          `<td>${esc(num(row.steps))}</td>` +
          `<td>${esc(num(row.api_attempts))}</td><td>${esc(usd(row.estimated_usd))}</td><td>${esc(usd(row.budget_charge_usd))}</td></tr>`;
      }),
      'Individual experiment states'
    );
    document.querySelectorAll('tr.pick').forEach(row => {
      const select = () => { inspect(episodes[Number(row.dataset.index)]); $('inspector').scrollIntoView({behavior:'smooth',block:'start'}); };
      row.addEventListener('click', select);
      row.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
    });
    inspect(rows.includes(chosen) ? chosen : rows[0] || null);
  }

  function empty(title, message) {
    return `<div class="empty-state"><strong>${esc(title)}</strong><span>${esc(message)}</span></div>`;
  }

  function showMedia(row) {
    const slot = $('rollout-media');
    slot.innerHTML = empty('Video unavailable', 'No playable rollout video was included for this episode.');
    if (!row?.video) return;
    const drive = googleDriveEmbedUrl(row.video);
    if (drive) {
      const frame = document.createElement('iframe');
      frame.src = drive;
      frame.title = `${taskLabel(row.task_id)} · state ${row.init_state}`;
      frame.loading = 'lazy';
      frame.allow = 'autoplay; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      slot.replaceChildren(frame);
      return;
    }
    try {
      const url = new URL(row.video, document.baseURI);
      if (!['http:','https:'].includes(url.protocol)) return;
      const video = document.createElement('video');
      video.controls = true; video.preload = 'metadata'; video.playsInline = true; video.src = url.href;
      video.addEventListener('error', () => { slot.innerHTML = empty('Video unavailable', 'The selected video could not be loaded.'); });
      slot.replaceChildren(video);
    } catch {}
  }

  function drawCalls(calls) {
    if (!calls.length) {
      $('token-plot').innerHTML = empty('No API trace in this export', 'Token, latency, and tool-call details will appear when call records are supplied.');
      $('calls').innerHTML = '';
      return;
    }
    const maximum = Math.max(1, ...calls.map(call => Number(call.output_tokens) || 0));
    $('token-plot').innerHTML = `<svg viewBox="0 0 700 130" role="img" aria-label="Output tokens by API call">${calls.map((call,index) => {
      const width = Math.max(2, 650 / Math.max(1,calls.length) - 2);
      const height = (Number(call.output_tokens) || 0) / maximum * 85;
      const x = 25 + index * 650 / Math.max(1,calls.length);
      return `<rect x="${x}" y="${105-height}" width="${width}" height="${height}" fill="#365bc5"><title>Call ${esc(call.call)}: ${esc(num(call.output_tokens))} output tokens</title></rect>`;
    }).join('')}<text x="25" y="125">Call 1</text><text x="610" y="125">Call ${calls.length}</text></svg>`;
    $('calls').innerHTML = table(
      ['Call','Input','Cached','Output','Reasoning','Cost','Latency','Tools','Status'],
      calls.map(call => cells([call.call,num(call.input_tokens),num(call.cached_tokens),num(call.output_tokens),num(call.reasoning_tokens),usd(call.estimated_usd),call.latency_s == null ? '—' : `${Number(call.latency_s).toFixed(1)} s`,(call.tools || []).join(', '),call.truncated ? 'Truncated' : call.usage_unknown ? 'Usage unknown' : call.http_status ?? '—'])),
      'API calls and token usage'
    );
  }

  function drawTrajectory(points) {
    if (!points.length) {
      $('trajectory').innerHTML = empty('No action path in this export', 'The commanded end-effector path will appear when trajectory data is supplied.');
      return;
    }
    const coordinates = points.map(point => [point[1],point[2]]);
    const xs = coordinates.map(point => point[0]), ys = coordinates.map(point => point[1]);
    const xmin=Math.min(...xs), xmax=Math.max(...xs), ymin=Math.min(...ys), ymax=Math.max(...ys);
    const sx=x=>25+(x-xmin)/Math.max(.001,xmax-xmin)*600, sy=y=>145-(y-ymin)/Math.max(.001,ymax-ymin)*120;
    $('trajectory').innerHTML = `<svg viewBox="0 0 650 170" role="img" aria-label="Commanded end-effector x-y path"><polyline fill="none" stroke="#365bc5" stroke-width="2" points="${coordinates.map(point=>`${sx(point[0])},${sy(point[1])}`).join(' ')}"/><circle cx="${sx(xs[0])}" cy="${sy(ys[0])}" r="4" fill="#087f75"/><circle cx="${sx(xs.at(-1))}" cy="${sy(ys.at(-1))}" r="4" fill="#b45432"/><text x="15" y="165">Start (teal) · End (orange) · x/y meters</text></svg>`;
  }

  function inspect(row) {
    chosen = row;
    document.querySelectorAll('tr.pick').forEach(element => element.setAttribute('aria-selected', String(row && Number(element.dataset.index) === episodes.indexOf(row))));
    if (!row) {
      $('selected-rollout').textContent = 'No rollout matches these filters';
      $('episode-meta').textContent = '';
      $('rollout-stats').innerHTML = '';
      $('rollout-media').innerHTML = empty('No rollout selected','Adjust the filters to find an episode.');
      drawCalls([]); drawTrajectory([]);
      $('conversation').textContent = 'No conversation data available.';
      $('protocol').textContent = 'No protocol data available.';
      return;
    }
    $('selected-rollout').textContent = `${row.model} / ${row.effort} · ${taskLabel(row.task_id)} · state ${row.init_state}`;
    $('episode-meta').textContent = `${row.instruction || row.task_name || ''} · ${row.status || 'status unavailable'}${row.stop_detail ? ` · ${row.stop_detail}` : ''}${row.review_note ? ` · Review: ${row.review_note}` : ''}`;
    $('rollout-stats').innerHTML = [
      ['Outcome', row.success === true ? 'Success' : attempted(row) ? row.status : 'Pending'],
      ['Simulator steps', num(row.steps)],
      ['API calls', num(row.api_attempts)],
      ['Estimated cost', usd(row.estimated_usd)]
    ].map(([label,value]) => `<div class="rollout-stat"><small>${esc(label)}</small><strong>${esc(value)}</strong></div>`).join('');
    showMedia(row);
    drawCalls(row.calls || []);
    drawTrajectory(row.trajectory || []);
    $('conversation').textContent = (row.conversation || []).length ? row.conversation.map(message => `${String(message.role || '').toUpperCase()}\n${message.text || ''}`).join('\n\n') : 'No conversation or tool-feedback data was included in this export.';
    $('protocol').textContent = row.protocol ? JSON.stringify(row.protocol,null,2) : 'No protocol data was included in this export.';
  }

  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g,'""')}"`;
  }

  function downloadFile(name, type, content) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([content],{type}));
    link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  $('download-json').addEventListener('click', () => downloadFile('llm-libero-results.json','application/json',JSON.stringify({episodes:filtered()},null,2)));
  $('download-csv').addEventListener('click', () => {
    const fields=['model','effort','task_id','init_state','status','success','reviewed_success','steps','api_attempts','estimated_usd','budget_charge_usd','stop_detail'];
    const content=[fields.map(csvCell).join(','),...filtered().map(row=>fields.map(field=>csvCell(row[field])).join(','))].join('\n');
    downloadFile('llm-libero-episodes.csv','text/csv;charset=utf-8',content);
  });
  ['model-filter','task-filter','effort-filter','state-filter'].forEach(id => $(id).addEventListener('change', draw));
  $('clear-filters').addEventListener('click', () => {
    ['model-filter','task-filter','effort-filter','state-filter'].forEach(id => { $(id).value=''; });
    chosen=null; draw();
  });

  const measuredModels = [...new Set(episodes.map(row=>row.model))];
  const measuredEfforts = [...new Set(episodes.map(row=>row.effort))];
  $('data-status').innerHTML = episodes.length
    ? `<strong>Partial results available.</strong> ${episodes.length} indexed rollouts across ${tasks.length} tasks for ${measuredModels.map(esc).join(', ')} at ${measuredEfforts.map(esc).join(' and ')} reasoning.`
    : '<strong>No experiment episodes are indexed yet.</strong>';
  draw();

  if (typeof module !== 'undefined' && module.exports) module.exports = {googleDriveEmbedUrl, attempted};
})(typeof window === 'undefined' ? globalThis : window);
