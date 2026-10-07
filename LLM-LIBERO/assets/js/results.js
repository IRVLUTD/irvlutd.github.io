(function (root) {
  'use strict';
  const data = root.LIBERO_DATA || {};
  const episodes = data.episodes || [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const usd = value => value == null ? '—' : `$${Number(value).toFixed(3)}`;
  const num = value => value == null ? '—' : Number(value).toLocaleString();
  const taskLabel = id => `Task ${String(Number(id) + 1).padStart(2,'0')}`;
  const rateColor = value => {
    const rate = Math.max(0, Math.min(100, Number(value) || 0));
    if (rate < 20) return '#ff7f73';
    if (rate < 40) return '#ffad66';
    if (rate < 60) return '#e9d85c';
    if (rate < 80) return '#82d88f';
    return '#4ee0a3';
  };
  const MODEL_LABELS = {
    'Claude-Opus-5-5':'Claude Opus 5.5',
    'GPT-6-Astra':'GPT-6 Astra',
    'GPT-6.1-Sol':'GPT-6.1 Sol',
    'GPT-6-Sol':'GPT-6 Sol',
    'GPT-6-Luna':'GPT-6 Luna'
  };
  const modelLabel = value => MODEL_LABELS[value] || String(value || '');
  const reasoningLabel = value => ({low:'Low',medium:'Medium',high:'High'}[String(value || '').toLowerCase()] || String(value || ''));
  const statusLabel = row => row?.status === 'incomplete_budget' ? 'Call limit reached' : String(row?.status || 'Pending').replaceAll('_',' ');

  function googleDriveFileId(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value);
      if (url.hostname !== 'drive.google.com') return null;
      const match = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)/);
      const id = match?.[1] || url.searchParams.get('id');
      return id && /^[A-Za-z0-9_-]+$/.test(id) ? id : null;
    } catch {
      return null;
    }
  }

  const googleDriveEmbedUrl = value => {
    const id = googleDriveFileId(value);
    return id ? `https://drive.google.com/file/d/${id}/preview` : null;
  };

  function setOptions(id, values, allLabel, format = value => value) {
    $(id).innerHTML = `<option value="">${esc(allLabel)}</option>` + values.map(value => `<option value="${esc(value)}">${esc(format(value))}</option>`).join('');
  }

  const models = [...new Set(episodes.map(row => row.model).filter(Boolean))].sort();
  const tasks = [...new Set(episodes.map(row => row.task_id).filter(value => value != null))].sort((a,b) => a-b);
  const efforts = [...new Set(episodes.map(row => row.effort).filter(Boolean))];
  const states = [...new Set(episodes.map(row => row.init_state).filter(value => value != null))].sort((a,b) => a-b);
  const modelColorMap = new Map((data.models || []).map(model => [model.name, model.color]));
  setOptions('model-filter', models, 'All models', modelLabel);
  setOptions('task-filter', tasks, 'All tasks', taskLabel);
  setOptions('effort-filter', efforts, 'All reasoning', reasoningLabel);
  setOptions('state-filter', states, 'All states', value => `State ${value}`);
  document.querySelectorAll('[data-filter-copy]').forEach(host => {
    host.innerHTML = $('results-filters').innerHTML;
    host.querySelectorAll('[id]').forEach(element => {
      element.dataset.sourceId = element.id;
      element.removeAttribute('id');
    });
  });

  function syncFilterCopies() {
    ['model-filter','task-filter','effort-filter','state-filter'].forEach(id => {
      const value = $(id).value;
      $(id).classList.toggle('has-selection', Boolean(value));
      document.querySelectorAll(`[data-source-id="${id}"]`).forEach(select => {
        select.value = value;
        select.classList.toggle('has-selection', Boolean(value));
      });
    });
  }
  if (data.meta?.createdAt && $('data-updated')) {
    const updated = new Date(data.meta.createdAt);
    if (!Number.isNaN(updated.getTime())) {
      $('data-updated').dateTime = updated.toISOString().slice(0,10);
      $('data-updated').textContent = new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(updated);
    }
  }

  function attempted(row) {
    return ['success','failure','incomplete_budget','api_error_usage_unknown','error','usage_unknown'].includes(row.status);
  }

  function completed(row) {
    return ['success','failure'].includes(row.status);
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

  function aggregateGroups(rows, key) {
    const groups = new Map();
    rows.forEach(row => {
      const name = key(row);
      const group = groups.get(name) || {completed:0,success:0,stopped:0,pending:0,cost:0,costKnown:false,calls:0,callsKnown:false};
      if (completed(row)) {
        group.completed += 1;
        if (row.success === true) group.success += 1;
      } else if (attempted(row)) {
        group.stopped += 1;
      } else {
        group.pending += 1;
      }
      if (row.estimated_usd != null) { group.cost += Number(row.estimated_usd) || 0; group.costKnown = true; }
      if (row.api_attempts != null) { group.calls += Number(row.api_attempts) || 0; group.callsKnown = true; }
      groups.set(name, group);
    });
    return [...groups].sort((a,b) => String(a[0]).localeCompare(String(b[0]), undefined, {numeric:true}));
  }

  function aggregate(rows, key) {
    return aggregateGroups(rows, key).map(([name, group]) => cells([
      name,
      `${group.success} / ${group.completed + group.stopped}`,
      group.completed + group.stopped ? `${(100 * group.success / (group.completed + group.stopped)).toFixed(1)}%` : '—',
      group.stopped,
      group.pending,
      group.costKnown ? usd(group.cost) : '—',
      group.callsKnown ? group.calls : '—'
    ]));
  }

  function rankedModelReasoning(rows) {
    const separator = '\u241f';
    return aggregateGroups(rows, row => `${row.model}${separator}${row.effort}`).map(([name,group]) => {
      const [model,effort] = name.split(separator);
      const planned = 100;
      const rate = 100 * group.success / planned;
      const [low,high] = wilson(group.success,planned);
      return {model,effort,group,planned,rate,low:100*low,high:100*high};
    }).sort((a,b) =>
      b.rate-a.rate ||
      b.group.success-a.group.success ||
      b.planned-a.planned ||
      a.model.localeCompare(b.model) ||
      a.effort.localeCompare(b.effort)
    );
  }

  function modelLeaderboard(rows) {
    return rankedModelReasoning(rows).map((entry,index) => cells([
      index+1,
      modelLabel(entry.model),
      reasoningLabel(entry.effort),
      `${entry.group.success} / ${entry.planned}`,
      `${entry.rate.toFixed(1)}%`,
      entry.planned-entry.group.success,
      entry.group.stopped,
      entry.group.costKnown ? usd(entry.group.cost) : '—',
      entry.group.callsKnown ? entry.group.calls : '—'
    ]));
  }

  function wilson(success, total) {
    if (!total) return [0,0];
    const z = 1.96;
    const p = success / total;
    const denominator = 1 + z * z / total;
    const center = (p + z * z / (2 * total)) / denominator;
    const spread = z * Math.sqrt((p * (1-p) + z * z / (4 * total)) / total) / denominator;
    return [Math.max(0,center-spread), Math.min(1,center+spread)];
  }

  function taskComparisonChart(rows) {
    const entries = aggregateGroups(rows, row => taskLabel(row.task_id)).map(([label,group]) => {
      const attempted = group.completed + group.stopped;
      const rate = attempted ? 100 * group.success / attempted : 0;
      const [low,high] = wilson(group.success, attempted);
      return {label,group,attempted,rate,low:100*low,high:100*high};
    });
    if (!entries.length) return '<div class="aggregate-chart-empty">No matching data</div>';
    const width = 920;
    const rowHeight = 42;
    const margin = {top:32,right:145,bottom:48,left:105};
    const chartWidth = width-margin.left-margin.right;
    const height = margin.top+entries.length*rowHeight+margin.bottom;
    const x = value => margin.left+chartWidth*Math.max(0,Math.min(100,value))/100;
    const ticks = [0,25,50,75,100];
    const grid = ticks.map(tick => `<g class="aggregate-axis-tick${tick === 50 ? ' aggregate-axis-midpoint' : ''}"><line x1="${x(tick)}" y1="${margin.top-10}" x2="${x(tick)}" y2="${height-margin.bottom}"></line><text x="${x(tick)}" y="${height-18}" text-anchor="middle">${tick}%</text></g>`).join('');
    const marks = entries.map((entry,index) => {
      const y = margin.top+index*rowHeight+rowHeight/2;
      const color = rateColor(entry.rate);
      const rate = entry.attempted ? `${entry.rate.toFixed(1)}%` : '—';
      return `<g class="task-estimate"><title>${esc(`${entry.label}: ${entry.group.success}/${entry.attempted}; 95% CI ${entry.low.toFixed(1)}–${entry.high.toFixed(1)}%`)}</title><text class="comparison-label" x="${margin.left-14}" y="${y+4}" text-anchor="end">${esc(entry.label)}</text><line class="confidence-interval" x1="${x(entry.low)}" y1="${y}" x2="${x(entry.high)}" y2="${y}" stroke="${color}"></line><line class="confidence-cap" x1="${x(entry.low)}" y1="${y-6}" x2="${x(entry.low)}" y2="${y+6}" stroke="${color}"></line><line class="confidence-cap" x1="${x(entry.high)}" y1="${y-6}" x2="${x(entry.high)}" y2="${y+6}" stroke="${color}"></line><circle cx="${x(entry.rate)}" cy="${y}" r="7" fill="${color}"></circle><text class="comparison-value" x="${width-margin.right+18}" y="${y+4}">${esc(`${rate}  (${entry.group.success}/${entry.attempted})`)}</text></g>`;
    }).join('');
    return `<svg class="aggregate-chart-svg task-comparison-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Task success rates with 95 percent confidence intervals"><rect class="aggregate-plot-background" x="${margin.left}" y="${margin.top-10}" width="${chartWidth}" height="${height-margin.bottom-margin.top+10}"></rect>${grid}${marks}<text class="aggregate-axis-title" x="${margin.left+chartWidth/2}" y="${height-2}" text-anchor="middle">LIBERO-confirmed success rate</text></svg>`;
  }

  function modelReasoningChart(rows) {
    const entries = rankedModelReasoning(rows);
    if (!entries.length) return '<div class="aggregate-chart-empty">No matching data</div>';
    const fallbackColors = ['#79c4ff','#70dab5','#c39bff','#ffb071'];
    const modelNames = [...new Set(entries.map(entry => entry.model))];
    const width = 920;
    const rowHeight = 48;
    const margin = {top:28,right:145,bottom:52,left:255};
    const chartWidth = width-margin.left-margin.right;
    const height = margin.top+entries.length*rowHeight+margin.bottom;
    const x = value => margin.left+chartWidth*Math.max(0,Math.min(100,value))/100;
    const grid = [0,25,50,75,100].map(tick => `<g class="aggregate-axis-tick${tick === 50 ? ' aggregate-axis-midpoint' : ''}"><line x1="${x(tick)}" y1="${margin.top-10}" x2="${x(tick)}" y2="${height-margin.bottom}"></line><text x="${x(tick)}" y="${height-18}" text-anchor="middle">${tick}%</text></g>`).join('');
    const marks = entries.map((entry,index) => {
      const y = margin.top+index*rowHeight+rowHeight/2;
      const modelIndex = modelNames.indexOf(entry.model);
      const color = modelColorMap.get(entry.model) || fallbackColors[modelIndex%fallbackColors.length];
      const rate = `${entry.rate.toFixed(1)}%`;
      const label = `${modelLabel(entry.model)} · ${reasoningLabel(entry.effort)}`;
      return `<g class="reasoning-estimate"><title>${esc(`#${index+1} ${label}: ${entry.group.success}/${entry.planned}; 95% CI ${entry.low.toFixed(1)}–${entry.high.toFixed(1)}%`)}</title><text class="leaderboard-rank" x="20" y="${y+4}">#${index+1}</text><text class="comparison-label" x="${margin.left-14}" y="${y+4}" text-anchor="end">${esc(label)}</text><line class="confidence-interval" x1="${x(entry.low)}" y1="${y}" x2="${x(entry.high)}" y2="${y}" stroke="${color}"></line><line class="confidence-cap" x1="${x(entry.low)}" y1="${y-6}" x2="${x(entry.low)}" y2="${y+6}" stroke="${color}"></line><line class="confidence-cap" x1="${x(entry.high)}" y1="${y-6}" x2="${x(entry.high)}" y2="${y+6}" stroke="${color}"></line><circle cx="${x(entry.rate)}" cy="${y}" r="7" fill="${color}"></circle><text class="comparison-value" x="${width-margin.right+18}" y="${y+4}">${esc(`${rate}  (${entry.group.success}/${entry.planned})`)}</text></g>`;
    }).join('');
    return `<svg class="aggregate-chart-svg reasoning-comparison-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Model and reasoning configurations ranked by success rate with 95 percent confidence intervals"><rect class="aggregate-plot-background" x="${margin.left}" y="${margin.top-10}" width="${chartWidth}" height="${height-margin.bottom-margin.top+10}"></rect>${grid}${marks}<text class="aggregate-axis-title" x="${margin.left+chartWidth/2}" y="${height-2}" text-anchor="middle">LIBERO-confirmed success rate</text></svg>`;
  }

  function miniBarChart(entries, maximum, format) {
    if (!entries.length) return '<span class="mini-chart-empty">No matching data</span>';
    const scale = Math.max(1, maximum);
    return `<span class="mini-chart">${entries.map((entry,index) => {
      const width = Math.max(0, Math.min(100, 100 * entry.value / scale));
      const color = entry.color ? `;background:${esc(entry.color)}` : '';
      return `<span class="mini-chart-row"><span class="mini-chart-rank">${index+1}</span><span class="mini-chart-label" title="${esc(entry.label)}">${esc(entry.label)}</span><span class="mini-chart-track"><i style="width:${width.toFixed(1)}%${color}"></i></span><strong>${esc(format(entry))}</strong></span>`;
    }).join('')}</span>`;
  }

  function chartCard(chartTitle, chart, chartType) {
    const scale = chartType === 'success' ? '<div class="mini-chart-scale" aria-hidden="true"><span><i>0%</i><i>50%</i><i>100%</i></span></div>' : '';
    const note = chartType === 'success' ? 'Higher is better' : 'Total measured spend';
    return `<article class="summary-card metric-chart-card" data-chart="${esc(chartType)}"><header class="metric-chart-heading"><h3 class="metric-chart-title">${esc(chartTitle)}</h3><span>${esc(note)}</span></header>${scale}${chart}</article>`;
  }

  let chosen = null;
  let spatialController = null;
  let urlStateEnabled = Boolean(location.search);

  function optionValue(id, value) {
    return [...$(id).options].some(option => option.value === value) ? value : '';
  }

  function applyUrlState() {
    const params = new URLSearchParams(location.search);
    $('model-filter').value = optionValue('model-filter', params.get('model') || '');
    $('task-filter').value = optionValue('task-filter', params.get('task') || '');
    $('effort-filter').value = optionValue('effort-filter', params.get('reasoning') || '');
    $('state-filter').value = optionValue('state-filter', params.get('state') || '');
    chosen = episodes.find(row => row.id && row.id === params.get('rollout')) || null;
  }

  function syncUrlState() {
    if (!urlStateEnabled) return;
    const url = new URL(location.href);
    const values = {
      model:$('model-filter').value,
      task:$('task-filter').value,
      reasoning:$('effort-filter').value,
      state:$('state-filter').value,
      rollout:chosen?.id || ''
    };
    Object.entries(values).forEach(([key,value]) => value ? url.searchParams.set(key,value) : url.searchParams.delete(key));
    history.replaceState(null,'',`${url.pathname}${url.search}${url.hash}`);
  }

  function draw() {
    const rows = filtered().sort((a,b) => a.task_id-b.task_id || a.init_state-b.init_state || String(a.model).localeCompare(String(b.model)) || String(a.effort).localeCompare(String(b.effort)));
    syncFilterCopies();
    const selectedModel = $('model-filter').value;
    const selectedTask = $('task-filter').value;
    const selectedEffort = $('effort-filter').value;
    const selectedState = $('state-filter').value;
    const selection = [
      selectedModel ? modelLabel(selectedModel) : 'All models',
      selectedTask ? taskLabel(Number(selectedTask)) : 'All tasks',
      selectedEffort ? `${reasoningLabel(selectedEffort)} reasoning` : 'All reasoning',
      selectedState ? `State ${selectedState}` : 'All states'
    ].join(' · ');

    if ($('task-stats-selection')) $('task-stats-selection').textContent = selection;
    $('task-chart-selection').textContent = selection;
    if ($('model-stats-selection')) $('model-stats-selection').textContent = selection;
    $('model-chart-selection').textContent = selection;
    if ($('state-stats-selection')) $('state-stats-selection').textContent = selection;

    const modelSummaries = [...new Set(rows.map(row => row.model).filter(Boolean))].sort().map(model => {
      const modelRows = rows.filter(row => row.model === model);
      const successes = modelRows.filter(row => row.success === true).length;
      const planned = new Set(modelRows.map(row => row.effort).filter(Boolean)).size * 100;
      const pricedRows = modelRows.filter(row => row.estimated_usd != null);
      return {
        label:modelLabel(model),
        successes,
        rate:planned ? 100 * successes / planned : 0,
        completed:planned,
        cost:pricedRows.reduce((sum,row) => sum + (Number(row.estimated_usd) || 0), 0),
        costKnown:pricedRows.length > 0
      };
    });
    const successEntries = modelSummaries
      .map(item => ({label:item.label,value:item.rate,successes:item.successes,completed:item.completed,color:rateColor(item.rate)}))
      .sort((a,b) => b.value-a.value || a.label.localeCompare(b.label));
    const successChart = miniBarChart(successEntries, 100, item => item.completed ? `${item.value.toFixed(0)}% · ${item.successes}/${item.completed}` : '—');
    const costEntries = modelSummaries
      .map(item => ({label:item.label,value:item.cost,costKnown:item.costKnown}))
      .sort((a,b) => b.value-a.value || a.label.localeCompare(b.label));
    const costChart = miniBarChart(costEntries, Math.max(0, ...costEntries.map(item => item.value)), item => item.costKnown ? usd(item.value) : '—');

    $('cards').innerHTML =
      chartCard('Success rate by model', successChart, 'success') +
      chartCard('Measured cost by model', costChart, 'cost');

    $('task-stats').innerHTML = table(
      ['Task','Success / attempted','Rate','Stopped early','Pending','Cost','Calls'],
      aggregate(rows, row => taskLabel(row.task_id)),
      'Success and cost grouped by task'
    );
    $('model-stats').innerHTML = table(
      ['Rank','Model','Reasoning','Success / 100','Rate','Failures','Stopped early','Cost','Calls'],
      modelLeaderboard(rows),
      'Model and reasoning leaderboard ordered by success rate'
    );
    $('task-stats-chart').innerHTML = taskComparisonChart(rows);
    $('model-stats-chart').innerHTML = modelReasoningChart(rows);
    $('state-count').textContent = `${rows.length} rollout${rows.length === 1 ? '' : 's'} shown.`;
    $('episodes').innerHTML = table(
      ['Model','Reasoning','Task','State','Status','Success','Steps','Calls','Cost','Budget charge'],
      rows.map(row => {
        const index = episodes.indexOf(row);
        const statusClass = row.success === true ? 'status-success' : attempted(row) ? 'status-failure' : '';
        return `<tr class="pick" tabindex="0" role="button" data-index="${index}" aria-selected="${row === chosen}">` +
          `<td>${esc(modelLabel(row.model))}</td><td>${esc(reasoningLabel(row.effort))}</td><td>${esc(taskLabel(row.task_id))}</td><td>${esc(row.init_state)}</td>` +
          `<td class="${statusClass}">${esc(statusLabel(row))}</td><td>${row.success === true ? 'Yes' : attempted(row) ? 'No' : 'Pending'}</td>` +
          `<td>${esc(num(row.steps))}</td>` +
          `<td>${esc(num(row.api_attempts))}</td><td>${esc(usd(row.estimated_usd))}</td><td>${esc(usd(row.budget_charge_usd))}</td></tr>`;
      }),
      'Individual experiment states'
    );
    document.querySelectorAll('tr.pick').forEach(row => {
      const select = () => { urlStateEnabled=true; inspect(episodes[Number(row.dataset.index)]); $('inspector').scrollIntoView({behavior:'smooth',block:'start'}); };
      row.addEventListener('click', select);
      row.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
    });
    inspect(rows.includes(chosen) ? chosen : rows[0] || null);
  }

  function empty(title, message) {
    return `<div class="empty-state"><strong>${esc(title)}</strong><span>${esc(message)}</span></div>`;
  }

  function showMedia(row, spatial) {
    const slot = $('rollout-media');
    slot.innerHTML = empty('Video unavailable', 'No playable rollout video was included for this episode.');
    if (!row?.video) return;
    const drivePreview = googleDriveEmbedUrl(row.video);
    if (drivePreview) {
      const frame = document.createElement('iframe');
      frame.src = drivePreview;
      frame.title = `${taskLabel(row.task_id)} · state ${row.init_state}`;
      frame.loading = 'lazy'; frame.allow = 'autoplay; fullscreen'; frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      const sourceRow = document.createElement('div');
      sourceRow.className = 'video-source-row';
      sourceRow.innerHTML = `<span>Google Drive video</span><a href="${esc(row.video)}" target="_blank" rel="noopener noreferrer">Open in Drive</a>`;
      slot.replaceChildren(frame, sourceRow);
      spatial?.bindVideo(null);
      return;
    }
    try {
      const url = new URL(row.video, document.baseURI);
      if (!['http:','https:'].includes(url.protocol)) return;
      const video = document.createElement('video');
      video.controls = true; video.preload = 'metadata'; video.playsInline = true; video.src = url.href;
      video.addEventListener('error', () => { slot.innerHTML = empty('Video unavailable', 'The selected video could not be loaded.'); }, {once:true});
      slot.replaceChildren(video);
      spatial?.bindVideo(video);
    } catch {}
  }

  function drawCalls(calls) {
    if (!calls.length) {
      $('token-plot').innerHTML = empty('No API trace in this export', 'Token, latency, and tool-call details will appear when call records are supplied.');
      $('calls').innerHTML = '';
      return;
    }
    const maximum = Math.max(.001, ...calls.map(call => Number(call.estimated_usd) || 0));
    $('token-plot').innerHTML = `<svg viewBox="0 0 700 130" role="img" aria-label="Estimated cost by API call">${calls.map((call,index) => {
      const width = Math.max(2, 650 / Math.max(1,calls.length) - 2);
      const height = (Number(call.estimated_usd) || 0) / maximum * 85;
      const x = 25 + index * 650 / Math.max(1,calls.length);
      return `<rect x="${x}" y="${105-height}" width="${width}" height="${height}" fill="#6f94ad"><title>Call ${esc(call.call)}: ${esc(usd(call.estimated_usd))}</title></rect>`;
    }).join('')}<text x="25" y="125">Call 1</text><text x="610" y="125">Call ${calls.length}</text></svg>`;
    $('calls').innerHTML = table(
      ['Call','Input','Cached','Output','Reasoning','Cost','Latency','Tools'],
      calls.map(call => cells([call.call,num(call.input_tokens),num(call.cached_tokens),num(call.output_tokens),num(call.reasoning_tokens),usd(call.estimated_usd),call.latency_s == null ? '—' : `${Number(call.latency_s).toFixed(1)} s`,(call.tools || []).join(', ')])),
      'API calls and token usage'
    );
  }

  function formatTimestamp(value) {
    const seconds = Math.max(0, Number(value) || 0);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String((seconds % 60).toFixed(1)).padStart(4,'0')}`;
  }

  function drawReasoning(calls) {
    const entries = calls.filter(call => call.plan_note).sort((a,b) => (Number(a.video_time_s)||0)-(Number(b.video_time_s)||0));
    $('reasoning-count').textContent = entries.length ? `(${entries.length} steps)` : '';
    if (!entries.length) {
      $('reasoning-timeline').innerHTML = empty('No reasoning timeline', 'This rollout does not include timestamped planning notes.');
      return;
    }
    $('reasoning-timeline').innerHTML = entries.map(call => {
      const time = Number(call.video_time_s) || 0;
      const target = Array.isArray(call.target_xyz) ? `Target: ${call.target_xyz.map(value=>Number(value).toFixed(3)).join(', ')} m` : '';
      return `<article class="reasoning-step"><header><button type="button" class="reasoning-time" data-time="${time}">${esc(formatTimestamp(time))}</button><strong>Plan ${esc(call.call ?? '—')}</strong><span>${esc((call.tools || []).join(', ') || 'observation')}</span></header><p>${esc(call.plan_note)}</p>${target ? `<small>${esc(target)}</small>` : ''}</article>`;
    }).join('');
    $('reasoning-timeline').querySelectorAll('.reasoning-time').forEach(button => button.addEventListener('click', () => {
      spatialController?.seekTime(Number(button.dataset.time) || 0);
      $('trajectory').scrollIntoView({behavior:'smooth',block:'center'});
    }));
  }

  function drawTrajectory(points, calls = []) {
    if (!points.length) {
      $('trajectory').innerHTML = empty('No action path in this export', 'The commanded end-effector path will appear when trajectory data is supplied.');
      return null;
    }
    const host = $('trajectory');
    host.innerHTML = '<div class="trajectory-view-switch" role="group" aria-label="Position marker"><span>Position marker</span><div><button type="button" data-marker="gripper" aria-pressed="false">Gripper</button><button type="button" data-marker="eef" aria-pressed="true">End effector</button></div></div><div class="trajectory-stage"><canvas aria-label="Interactive 3D end-effector trajectory"></canvas><div class="trajectory-legend"><span><i class="position-dot"></i><b>End effector</b></span><span><i class="target-dot"></i>Planned object target</span></div></div><div class="trajectory-controls"><button type="button" class="subtle-button trajectory-play">Play 3D timeline</button><label class="trajectory-scrubber">Rollout progress<input type="range" min="0" max="1000" value="0" aria-label="Trajectory progress"></label></div><div class="trajectory-readout" aria-live="polite"></div>';
    const canvas = host.querySelector('canvas');
    const context = canvas.getContext('2d');
    const slider = host.querySelector('input');
    const playButton = host.querySelector('.trajectory-play');
    const readout = host.querySelector('.trajectory-readout');
    const markerButtons = [...host.querySelectorAll('[data-marker]')];
    const markerLegend = host.querySelector('.trajectory-legend b');
    const path = points.map(point => [Number(point[1]), Number(point[2]), Number(point[3])]);
    const spatialCalls = calls.filter(call => Array.isArray(call.target_xyz) || Array.isArray(call.observed_xyz));
    const cloud = path.concat(spatialCalls.flatMap(call => [call.target_xyz,call.observed_xyz].filter(Array.isArray)));
    const center = [0,1,2].map(axis => (Math.min(...cloud.map(point=>Number(point[axis]))) + Math.max(...cloud.map(point=>Number(point[axis])))) / 2);
    const span = Math.max(.08, ...[0,1,2].map(axis => Math.max(...cloud.map(point=>Number(point[axis]))) - Math.min(...cloud.map(point=>Number(point[axis])))));
    const timelineDuration = Math.max(1, ...spatialCalls.map(call=>Number(call.video_time_s)||0));
    let progress = 0, videoTime = 0, videoDuration = 0, yaw = -.72, pitch = .52, video = null, dragging = false, last = null, animation = null, videoAnimation = null, previousFrame = 0, spinAnimation = null, previousSpin = 0, destroyed = false, markerMode = 'eef';

    function activeCall() {
      if (!spatialCalls.length) return null;
      if (videoDuration > 0 && spatialCalls.some(call => call.video_time_s != null)) {
        return spatialCalls.reduce((active, call) => Number(call.video_time_s) <= videoTime ? call : active, spatialCalls[0]);
      }
      return spatialCalls[Math.min(spatialCalls.length - 1, Math.floor(progress * spatialCalls.length))];
    }

    function render() {
      canvas.dataset.viewAngle=yaw.toFixed(3);
      const ratio = devicePixelRatio || 1;
      const width = Math.max(320, canvas.clientWidth), height = canvas.clientHeight || 340;
      if (canvas.width !== Math.round(width*ratio) || canvas.height !== Math.round(height*ratio)) {
        canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
      }
      context.setTransform(ratio,0,0,ratio,0,0);
      context.clearRect(0,0,width,height);
      const scale = Math.min(width,height) * .67 / span;
      const project = point => {
        const x=point[0]-center[0], y=point[1]-center[1], z=point[2]-center[2];
        const rx=Math.cos(yaw)*x-Math.sin(yaw)*y, ry=Math.sin(yaw)*x+Math.cos(yaw)*y;
        return [width*.5+rx*scale,height*.55-(Math.cos(pitch)*z-Math.sin(pitch)*ry)*scale];
      };
      const origin = project(center);
      context.lineWidth=1; context.font='11px Noto Sans, sans-serif';
      [['x',[span*.34,0,0],'#ff8e82'],['y',[0,span*.34,0],'#78d7ad'],['z',[0,0,span*.34],'#79c4ff']].forEach(([label,delta,color])=>{
        const end=project(center.map((value,index)=>value+delta[index])); context.strokeStyle=color; context.beginPath(); context.moveTo(...origin); context.lineTo(...end); context.stroke(); context.fillStyle=color; context.fillText(label,end[0]+4,end[1]-4);
      });
      const currentIndex=Math.min(path.length-1,Math.round(progress*(path.length-1)));
      const drawPath=(from,to,color,widthValue)=>{ context.strokeStyle=color; context.lineWidth=widthValue; context.beginPath(); for(let index=from;index<=to;index++){ const point=project(path[index]); index===from?context.moveTo(...point):context.lineTo(...point); } context.stroke(); };
      if(currentIndex<path.length-1) drawPath(currentIndex,path.length-1,'rgba(126,157,184,.28)',1.5);
      drawPath(0,currentIndex,'#79c4ff',3);
      const call=activeCall();
      const markerPosition=markerMode==='eef'&&Array.isArray(call?.observed_xyz)?call.observed_xyz:path[currentIndex];
      const marker=project(markerPosition);
      const markerLabel=markerMode==='eef'?'End effector':'Gripper';
      context.fillStyle='#79c4ff'; context.shadowColor='#79c4ff'; context.shadowBlur=14; context.beginPath(); context.arc(marker[0],marker[1],6,0,Math.PI*2); context.fill(); context.shadowBlur=0;
      context.fillStyle='#edf5ff'; context.fillText(markerLabel,marker[0]+10,marker[1]-9);
      if(call?.target_xyz){ const target=project(call.target_xyz); context.fillStyle='#ffb071'; context.shadowColor='#ffb071'; context.shadowBlur=14; context.beginPath(); context.moveTo(target[0],target[1]-7); context.lineTo(target[0]+7,target[1]); context.lineTo(target[0],target[1]+7); context.lineTo(target[0]-7,target[1]); context.closePath(); context.fill(); context.shadowBlur=0; context.fillStyle='#ffe2be'; context.fillText('Planned object target',target[0]+10,target[1]-9); context.setLineDash([5,5]); context.strokeStyle='rgba(255,176,113,.65)'; context.beginPath(); context.moveTo(...marker); context.lineTo(...target); context.stroke(); context.setLineDash([]); }
      const callLabel=call ? `Plan ${call.call ?? '—'}${call.tools?.length ? ` · ${call.tools.join(', ')}` : ''}` : 'Execution path';
      const timing=videoDuration ? ` · ${videoTime.toFixed(1)} / ${videoDuration.toFixed(1)} s` : ` · ${Math.round(progress*100)}%`;
      readout.textContent=`${callLabel}${timing}${call?.plan_note ? ` — ${call.plan_note}` : ''}`;
    }

    const observer = new ResizeObserver(render);
    const updateFromVideo = () => {
      if (!video) return;
      videoDuration=Number.isFinite(video.duration)?video.duration:0;
      videoTime=video.currentTime||0;
      progress=videoDuration?videoTime/videoDuration:progress;
      slider.value=String(Math.round(progress*1000));
      playButton.textContent=video.paused?'Play video + 3D':'Pause video + 3D';
      render();
    };
    const stopVideoAnimation = () => { if(videoAnimation) cancelAnimationFrame(videoAnimation); videoAnimation=null; };
    const syncVideoFrame = () => {
      updateFromVideo();
      if(video && !video.paused && !video.ended) videoAnimation=requestAnimationFrame(syncVideoFrame);
      else videoAnimation=null;
    };
    const controller = {
      bindVideo(nextVideo) {
        stopVideoAnimation();
        video = nextVideo;
        if (!video) { videoDuration=0; playButton.textContent='Play 3D timeline'; render(); return; }
        video.addEventListener('loadedmetadata',updateFromVideo);
        video.addEventListener('timeupdate',updateFromVideo);
        video.addEventListener('durationchange',updateFromVideo);
        video.addEventListener('seeking',updateFromVideo);
        video.addEventListener('seeked',updateFromVideo);
        video.addEventListener('play',()=>{ stopVideoAnimation(); videoAnimation=requestAnimationFrame(syncVideoFrame); updateFromVideo(); });
        video.addEventListener('pause',()=>{ stopVideoAnimation(); updateFromVideo(); });
        video.addEventListener('ended',()=>{ stopVideoAnimation(); updateFromVideo(); });
        updateFromVideo();
      },
      seekTime(seconds) {
        stopAnimation();
        if(video&&Number.isFinite(video.duration)) {
          video.currentTime=Math.max(0,Math.min(video.duration,seconds));
        } else {
          videoTime=Math.max(0,Math.min(timelineDuration,seconds)); progress=videoTime/timelineDuration;
          slider.value=String(Math.round(progress*1000)); render();
        }
      },
      destroy() {
        destroyed=true; stopAnimation(); stopVideoAnimation();
        if(spinAnimation) cancelAnimationFrame(spinAnimation);
        observer.disconnect();
      }
    };
    function stopAnimation(){ if(animation) cancelAnimationFrame(animation); animation=null; previousFrame=0; playButton.textContent=video?(video.paused?'Play video + 3D':'Pause video + 3D'):'Play 3D timeline'; }
    function animate(timestamp){ if(!previousFrame) previousFrame=timestamp; videoTime+=Math.min(.1,(timestamp-previousFrame)/1000); previousFrame=timestamp; progress=Math.min(1,videoTime/timelineDuration); slider.value=String(Math.round(progress*1000)); render(); if(progress>=1) stopAnimation(); else animation=requestAnimationFrame(animate); }
    function spin(timestamp){ if(destroyed)return; if(!dragging&&previousSpin){ yaw+=(timestamp-previousSpin)*.00007; render(); } previousSpin=timestamp; spinAnimation=requestAnimationFrame(spin); }
    playButton.addEventListener('click',()=>{ if(video){ video.paused?video.play():video.pause(); return; } if(animation){stopAnimation();return;} if(progress>=1){progress=0;videoTime=0;} playButton.textContent='Pause 3D timeline'; animation=requestAnimationFrame(animate); });
    markerButtons.forEach(button=>button.addEventListener('click',()=>{ markerMode=button.dataset.marker; markerButtons.forEach(option=>option.setAttribute('aria-pressed',String(option===button))); const label=markerMode==='eef'?'End effector':'Gripper'; markerLegend.textContent=label; canvas.setAttribute('aria-label',`Interactive 3D ${label.toLowerCase()} trajectory`); render(); }));
    slider.addEventListener('input',()=>{ stopAnimation(); progress=Number(slider.value)/1000; if(video&&Number.isFinite(video.duration)) video.currentTime=progress*video.duration; else { videoTime=progress*timelineDuration; render(); } });
    canvas.addEventListener('pointerdown',event=>{ dragging=true; previousSpin=0; last=[event.clientX,event.clientY]; canvas.setPointerCapture(event.pointerId); });
    canvas.addEventListener('pointermove',event=>{ if(!dragging)return; yaw+=(event.clientX-last[0])*.009; pitch=Math.max(-1.2,Math.min(1.2,pitch+(event.clientY-last[1])*.009)); last=[event.clientX,event.clientY]; render(); });
    canvas.addEventListener('pointerup',()=>{ dragging=false; previousSpin=0; });
    canvas.addEventListener('pointercancel',()=>{ dragging=false; previousSpin=0; });
    observer.observe(canvas); render();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches) spinAnimation=requestAnimationFrame(spin);
    return controller;
  }

  function inspect(row) {
    chosen = row;
    document.querySelectorAll('tr.pick').forEach(element => element.setAttribute('aria-selected', String(row && Number(element.dataset.index) === episodes.indexOf(row))));
    if (!row) {
      spatialController?.destroy(); spatialController=null;
      $('selected-rollout').textContent = 'No rollout matches these filters';
      $('episode-meta').textContent = '';
      $('rollout-stats').innerHTML = '';
      $('rollout-media').innerHTML = empty('No rollout selected','Adjust the filters to find an episode.');
      $('api-table-selection').textContent = 'No rollout selected';
      $('api-chart-selection').textContent = 'No rollout selected';
      drawCalls([]); drawTrajectory([]); drawReasoning([]);
      syncUrlState();
      return;
    }
    $('selected-rollout').textContent = `${modelLabel(row.model)} / ${reasoningLabel(row.effort)} · ${taskLabel(row.task_id)} · state ${row.init_state}`;
    const episodeSelection = `${modelLabel(row.model)} · ${reasoningLabel(row.effort)} · ${taskLabel(row.task_id)} · State ${row.init_state}`;
    $('api-table-selection').textContent = episodeSelection;
    $('api-chart-selection').textContent = episodeSelection;
    $('episode-meta').textContent = [row.instruction || row.task_name,row.stop_detail,row.review_note ? `Review: ${row.review_note}` : ''].filter(Boolean).join(' · ');
    const outcome = row.success === true ? 'Success' : attempted(row) ? 'Failure' : 'Pending';
    const outcomeClass = row.success === true ? 'status-success' : attempted(row) ? 'status-failure' : '';
    $('rollout-stats').innerHTML = [
      ['Outcome', outcome, outcomeClass],
      ['Steps', num(row.steps), ''],
      ['Calls', num(row.api_attempts), ''],
      ['Cost', usd(row.estimated_usd), '']
    ].map(([label,value,className]) => `<div class="rollout-stat"><small>${esc(label)}</small><strong class="${esc(className)}">${esc(value)}</strong></div>`).join('');
    drawCalls(row.calls || []);
    spatialController?.destroy();
    spatialController = drawTrajectory(row.trajectory || [], row.calls || []);
    drawReasoning(row.calls || []);
    showMedia(row, spatialController);
    syncUrlState();
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
  ['model-filter','task-filter','effort-filter','state-filter'].forEach(id => $(id).addEventListener('change', () => { urlStateEnabled=true; draw(); }));
  $('clear-filters').addEventListener('click', () => {
    ['model-filter','task-filter','effort-filter','state-filter'].forEach(id => { $(id).value=''; });
    urlStateEnabled=true; chosen=null; draw();
  });
  document.querySelectorAll('[data-filter-copy]').forEach(toolbar => {
    toolbar.addEventListener('change', event => {
      const sourceId = event.target.dataset.sourceId;
      if (!sourceId || !$(sourceId)) return;
      $(sourceId).value = event.target.value;
      urlStateEnabled=true;
      draw();
    });
    toolbar.addEventListener('click', event => {
      const button = event.target.closest('button[data-source-id]');
      if (button && $(button.dataset.sourceId)) $(button.dataset.sourceId).click();
    });
  });
  function setAggregateView(card, flipped) {
    const front = card.querySelector('.aggregate-front');
    const back = card.querySelector('.aggregate-back');
    card.classList.toggle('is-flipped', flipped);
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    front.querySelector('.aggregate-view-toggle').tabIndex = flipped ? -1 : 0;
    back.querySelector('.aggregate-view-toggle').tabIndex = flipped ? 0 : -1;
  }

  function setGraphHash(id) {
    const url = new URL(location.href);
    url.hash = id;
    history.replaceState(null,'',`${url.pathname}${url.search}${url.hash}`);
  }

  function applyGraphHash() {
    const anchor = location.hash.slice(1);
    document.querySelectorAll('.aggregate-flip-card').forEach(card => {
      if (anchor === card.dataset.graphAnchor) {
        setAggregateView(card,true);
        card.closest('details')?.setAttribute('open','');
      }
      else if (anchor === card.id) setAggregateView(card,false);
    });
  }

  document.querySelectorAll('.aggregate-view-toggle').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.aggregate-flip-card');
    const flipped = !card.classList.contains('is-flipped');
    setAggregateView(card,flipped);
    setGraphHash(flipped ? card.dataset.graphAnchor : card.id);
  }));
  window.addEventListener('hashchange', applyGraphHash);

  window.addEventListener('popstate', () => { urlStateEnabled=Boolean(location.search); applyUrlState(); draw(); });
  applyUrlState();
  applyGraphHash();
  draw();

  if (typeof module !== 'undefined' && module.exports) module.exports = {googleDriveEmbedUrl, attempted};
})(typeof window === 'undefined' ? globalThis : window);
