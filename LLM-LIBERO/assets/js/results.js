(function (root) {
  'use strict';
  const data = root.LIBERO_DATA || {};
  const episodes = data.episodes || [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const usd = value => value == null ? '—' : `$${Number(value).toFixed(3)}`;
  const num = value => value == null ? '—' : Number(value).toLocaleString();
  const taskLabel = id => `Task ${String(Number(id) + 1).padStart(2,'0')}`;
  const MODEL_LABELS = {
    'Claude-Opus-5':'Claude Opus 5',
    'Claude-Opus-5-5':'Claude Opus 5.5',
    'GPT-6-Astra':'GPT-6 Astra',
    'GPT-6.1-Sol':'GPT-6.1 Sol',
    'GPT-6-Sol':'GPT-6 Sol',
    'GPT-6-Luna':'GPT-6 Luna'
  };
  const modelLabel = value => MODEL_LABELS[value] || String(value || '');
  // Validated categorical order (colorblind-safe on the dark chart surface); shapes are the secondary encoding.
  const MODEL_STYLES = [
    ['Claude-Opus-5-5',{color:'#3987e5',shape:'circle'}],
    ['Claude-Opus-5',{color:'#7a74df',shape:'cross'}],
    ['GPT-6.1-Sol',{color:'#d95926',shape:'square'}],
    ['GPT-6-Astra',{color:'#199e70',shape:'triangle'}],
    ['GPT-6-Luna',{color:'#e56b9f',shape:'diamond'}]
  ];
  const MODEL_ORDER = MODEL_STYLES.map(([name]) => name);
  const MODEL_STYLE_MAP = new Map(MODEL_STYLES);
  const modelStyle = value => MODEL_STYLE_MAP.get(value) || {color:'#8299ad',shape:'circle'};
  const byModelOrder = (a,b) => (MODEL_ORDER.indexOf(a) + 1 || 99) - (MODEL_ORDER.indexOf(b) + 1 || 99) || String(a).localeCompare(String(b));
  const taskDescription = id => (data.tasks || []).find(task => task.id === `task-${id}`)?.description || '';
  const clip = (text, length) => text.length > length ? `${text.slice(0,length-1).trimEnd()}…` : text;
  // fillStyle encodes reasoning level when one model is shown: low = outline, medium = half, high = solid.
  function shapeMarker(shape, cx, cy, r, color, fillStyle = 'solid') {
    const paint = fillStyle === 'solid' ? `fill="${color}"`
      : `fill="${fillStyle === 'half' ? color : '#0d1b28'}"${fillStyle === 'half' ? ' fill-opacity=".45"' : ''} style="stroke:${color};stroke-width:1.75"`;
    if (shape === 'square') return `<rect x="${cx-r*.9}" y="${cy-r*.9}" width="${r*1.8}" height="${r*1.8}" rx="1.5" ${paint}></rect>`;
    if (shape === 'triangle') return `<path d="M${cx} ${cy-r*1.15}L${cx+r*1.1} ${cy+r*.8}L${cx-r*1.1} ${cy+r*.8}Z" ${paint}></path>`;
    if (shape === 'diamond') return `<path d="M${cx} ${cy-r*1.2}L${cx+r*1.2} ${cy}L${cx} ${cy+r*1.2}L${cx-r*1.2} ${cy}Z" ${paint}></path>`;
    if (shape === 'cross') return `<path d="M${cx-r*.35} ${cy-r}H${cx+r*.35}V${cy-r*.35}H${cx+r}V${cy+r*.35}H${cx+r*.35}V${cy+r}H${cx-r*.35}V${cy+r*.35}H${cx-r}V${cy-r*.35}H${cx-r*.35}Z" ${paint}></path>`;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" ${paint}></circle>`;
  }
  const EFFORT_ORDER = ['low','medium','high'];
  const EFFORT_FILL = {low:'hollow',medium:'half',high:'solid'};
  const byEffortOrder = (a,b) => (EFFORT_ORDER.indexOf(String(a).toLowerCase()) + 1 || 99) - (EFFORT_ORDER.indexOf(String(b).toLowerCase()) + 1 || 99);
  function chartLegend(modelNames, extra = '') {
    const items = [...modelNames].sort(byModelOrder).map(name => {
      const style = modelStyle(name);
      return `<span class="chart-legend-item"><svg viewBox="0 0 14 14" aria-hidden="true">${shapeMarker(style.shape,7,7,5,style.color)}</svg>${esc(modelLabel(name))}</span>`;
    }).join('');
    return `<div class="chart-legend">${items}${extra}</div>`;
  }
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
  const chartSort = {success:'desc',cost:'desc',model:'desc',task:'desc'};
  const tableSort = {
    model:{key:'rate',direction:'desc'},
    task:{key:null,direction:'desc'},
    rollout:{key:null,direction:'desc'}
  };
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

  function table(headers, rows, caption, tableName) {
    const active = tableSort[tableName];
    const heading = header => {
      if (typeof header === 'string' || !header.sortKey) return `<th scope="col">${esc(header.label || header)}</th>`;
      const selected = active?.key === header.sortKey;
      const direction = selected ? active.direction : null;
      const next = selected && direction === 'desc' ? 'low to high' : 'high to low';
      const icon = direction === 'desc' ? '↓' : direction === 'asc' ? '↑' : '↕';
      const ariaSort = selected ? (direction === 'desc' ? 'descending' : 'ascending') : 'none';
      return `<th scope="col" aria-sort="${ariaSort}"><button type="button" class="table-sort-toggle${selected ? ' is-active' : ''}" data-sort-table="${esc(tableName)}" data-sort-key="${esc(header.sortKey)}" data-sort-type="${esc(header.sortType || 'number')}" aria-label="Sort ${esc(header.label)} ${next}" title="Sort ${next}"><span>${esc(header.label)}</span><i aria-hidden="true">${icon}</i></button></th>`;
    };
    return `<table class="results-table"><caption class="sr-only">${esc(caption)}</caption><thead><tr>${headers.map(heading).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
  }

  function cells(values) {
    return `<tr>${values.map(value => `<td>${esc(value)}</td>`).join('')}</tr>`;
  }

  function sortedForTable(items, tableName, accessors) {
    const state = tableSort[tableName];
    if (!state?.key || !accessors[state.key]) return [...items];
    const valueFor = accessors[state.key];
    const direction = state.direction === 'asc' ? 1 : -1;
    return [...items].sort((a,b) => {
      const left = valueFor(a);
      const right = valueFor(b);
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      if (typeof left === 'string' || typeof right === 'string') return direction * String(left).localeCompare(String(right),undefined,{numeric:true});
      return direction * (Number(left)-Number(right));
    });
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
      const planned = group.completed + group.stopped + group.pending;
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
    const ranked = rankedModelReasoning(rows).map((entry,index) => ({...entry,rank:index+1}));
    const sorted = sortedForTable(ranked,'model',{
      success:entry => entry.group.success,
      rate:entry => entry.rate,
      failures:entry => entry.planned-entry.group.success,
      stopped:entry => entry.group.stopped,
      cost:entry => entry.group.costKnown ? entry.group.cost : null,
      calls:entry => entry.group.callsKnown ? entry.group.calls : null
    });
    return sorted.map(entry => cells([
      entry.rank,
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

  function percentAxis(x, top, bottom, height) {
    return [0,25,50,75,100].map(tick => `<g class="aggregate-axis-tick${tick === 50 ? ' aggregate-axis-midpoint' : ''}"><line x1="${x(tick)}" y1="${top}" x2="${x(tick)}" y2="${bottom}"></line><text x="${x(tick)}" y="${height-18}" text-anchor="middle">${tick}%</text></g>`).join('');
  }

  function taskComparisonChart(rows) {
    const shownModels = [...new Set(rows.map(row => row.model))].sort(byModelOrder);
    const shownEfforts = [...new Set(rows.map(row => row.effort).filter(Boolean))].sort(byEffortOrder);
    const singleModel = shownModels.length === 1 ? shownModels[0] : null;
    const splitField = singleModel ? 'effort' : 'model';
    const splitKeys = singleModel ? (shownEfforts.length > 1 ? shownEfforts : []) : shownModels;
    const splitStyle = key => singleModel
      ? {...modelStyle(singleModel), fill:EFFORT_FILL[String(key).toLowerCase()] || 'solid'}
      : {...modelStyle(key), fill:'solid'};
    const splitLabel = key => singleModel ? `${reasoningLabel(key)} reasoning` : modelLabel(key);
    const overallLabel = singleModel ? modelLabel(singleModel) : 'All models';
    const entries = aggregateGroups(rows, row => row.task_id).map(([taskId,group]) => {
      const runs = group.completed + group.stopped;
      const rate = runs ? 100 * group.success / runs : 0;
      const [low,high] = wilson(group.success, runs);
      const taskRows = rows.filter(row => row.task_id === taskId);
      const splits = splitKeys.map(key => {
        const splitRows = taskRows.filter(row => row[splitField] === key && attempted(row));
        const success = splitRows.filter(row => row.success === true).length;
        return {key,success,attempted:splitRows.length,rate:splitRows.length ? 100 * success / splitRows.length : 0};
      }).filter(item => item.attempted);
      return {taskId,label:taskLabel(taskId),description:taskDescription(taskId),group,attempted:runs,rate,low:100*low,high:100*high,splits};
    }).sort((a,b) => (chartSort.task === 'asc' ? a.rate-b.rate : b.rate-a.rate) || a.taskId-b.taskId);
    if (!entries.length) return '<div class="aggregate-chart-empty">No matching data</div>';
    const width = 920;
    const rowHeight = 54;
    const margin = {top:20,right:112,bottom:48,left:318};
    const chartWidth = width-margin.left-margin.right;
    const height = margin.top+entries.length*rowHeight+margin.bottom;
    const x = value => margin.left+chartWidth*Math.max(0,Math.min(100,value))/100;
    const marks = entries.map((entry,index) => {
      const top = margin.top+index*rowHeight;
      const y = top+rowHeight/2;
      const slots = splitKeys.length;
      const spread = slots > 1 ? 14 / (slots-1) : 0;
      const markers = entry.splits.map(item => {
        const style = splitStyle(item.key);
        return shapeMarker(style.shape, x(item.rate), y-7+splitKeys.indexOf(item.key)*spread, 5, style.color, style.fill);
      }).join('');
      const tip = [
        `${entry.label} · ${entry.description}`,
        `${overallLabel}: ${entry.attempted ? entry.rate.toFixed(1) : '—'}% (${entry.group.success}/${entry.attempted}) · 95% CI ${entry.low.toFixed(0)}–${entry.high.toFixed(0)}%`,
        ...entry.splits.map(item => `${splitLabel(item.key)}: ${item.rate.toFixed(0)}% (${item.success}/${item.attempted})`)
      ].join('\n');
      return `<g class="chart-row task-estimate" data-tip="${esc(tip)}"><rect class="chart-hit" x="0" y="${top}" width="${width}" height="${rowHeight}"></rect>` +
        `<text class="comparison-label" x="16" y="${y-4}">${esc(entry.label)}</text><text class="comparison-sublabel" x="16" y="${y+12}">${esc(clip(entry.description,50))}</text>` +
        `<rect class="overall-interval" x="${x(entry.low)}" y="${y-11}" width="${Math.max(3,x(entry.high)-x(entry.low))}" height="22" rx="5"></rect><line class="overall-estimate" x1="${x(entry.rate)}" y1="${y-13}" x2="${x(entry.rate)}" y2="${y+13}"></line>` +
        `<g class="model-markers">${markers}</g>` +
        `<text class="comparison-value" x="${width-margin.right+16}" y="${y+4}"><tspan class="comparison-value-main">${esc(entry.attempted ? `${entry.rate.toFixed(1)}%` : '—')}</tspan> ${esc(`${entry.group.success}/${entry.attempted}`)}</text></g>`;
    }).join('');
    const splitLegend = singleModel
      ? splitKeys.map(key => { const style = splitStyle(key); return `<span class="chart-legend-item"><svg viewBox="0 0 14 14" aria-hidden="true">${shapeMarker(style.shape,7,7,5,style.color,style.fill)}</svg>${esc(splitLabel(key))}</span>`; }).join('')
      : '';
    const legend = chartLegend(singleModel ? [] : shownModels, `${splitLegend}<span class="chart-legend-item"><svg viewBox="0 0 22 14" aria-hidden="true"><rect class="overall-interval" x="1" y="2" width="20" height="10" rx="3"></rect><line class="overall-estimate" x1="11" y1="1" x2="11" y2="13"></line></svg>${esc(overallLabel)} · 95% CI</span>`);
    return `${legend}<svg class="aggregate-chart-svg task-comparison-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Task success rates for all models with 95 percent confidence intervals, plus each model's rate per task"><rect class="aggregate-plot-background" x="${margin.left}" y="${margin.top}" width="${chartWidth}" height="${height-margin.bottom-margin.top}"></rect>${percentAxis(x,margin.top,height-margin.bottom,height)}${marks}<text class="aggregate-axis-title" x="${margin.left+chartWidth/2}" y="${height-2}" text-anchor="middle">LIBERO-confirmed success rate</text></svg>`;
  }

  function modelReasoningChart(rows) {
    const entries = rankedModelReasoning(rows).map((entry,index) => ({...entry,rank:index+1}));
    if (chartSort.model === 'asc') entries.sort((a,b) => a.rate-b.rate || a.rank-b.rank);
    if (!entries.length) return '<div class="aggregate-chart-empty">No matching data</div>';
    const width = 920;
    const rowHeight = 44;
    const margin = {top:20,right:112,bottom:48,left:236};
    const chartWidth = width-margin.left-margin.right;
    const height = margin.top+entries.length*rowHeight+margin.bottom;
    const x = value => margin.left+chartWidth*Math.max(0,Math.min(100,value))/100;
    const marks = entries.map((entry,index) => {
      const top = margin.top+index*rowHeight;
      const y = top+rowHeight/2;
      const style = modelStyle(entry.model);
      const label = `${modelLabel(entry.model)} · ${reasoningLabel(entry.effort)}`;
      const tip = [
        `#${entry.rank} ${label}`,
        `Success: ${entry.rate.toFixed(1)}% (${entry.group.success}/${entry.planned})`,
        `95% CI: ${entry.low.toFixed(1)}–${entry.high.toFixed(1)}%`,
        `Stopped early: ${entry.group.stopped}`,
        entry.group.costKnown ? `Cost: ${usd(entry.group.cost)}` : ''
      ].filter(Boolean).join('\n');
      return `<g class="chart-row reasoning-estimate" data-tip="${esc(tip)}"><rect class="chart-hit" x="0" y="${top}" width="${width}" height="${rowHeight}"></rect>` +
        `<text class="leaderboard-rank" x="16" y="${y+4}">${entry.rank}</text><text class="comparison-label" x="${margin.left-16}" y="${y+4}" text-anchor="end">${esc(label)}</text>` +
        `<line class="confidence-interval" x1="${x(entry.low)}" y1="${y}" x2="${x(entry.high)}" y2="${y}" stroke="${style.color}"></line>` +
        `<line class="confidence-cap" x1="${x(entry.low)}" y1="${y-6}" x2="${x(entry.low)}" y2="${y+6}" stroke="${style.color}"></line><line class="confidence-cap" x1="${x(entry.high)}" y1="${y-6}" x2="${x(entry.high)}" y2="${y+6}" stroke="${style.color}"></line>` +
        `<g class="model-markers">${shapeMarker(style.shape,x(entry.rate),y,7,style.color)}</g>` +
        `<text class="comparison-value" x="${width-margin.right+16}" y="${y+4}"><tspan class="comparison-value-main">${esc(`${entry.rate.toFixed(1)}%`)}</tspan> ${esc(`${entry.group.success}/${entry.planned}`)}</text></g>`;
    }).join('');
    return `${chartLegend(new Set(entries.map(entry => entry.model)))}<svg class="aggregate-chart-svg reasoning-comparison-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Model and reasoning configurations ranked by success rate with 95 percent confidence intervals"><rect class="aggregate-plot-background" x="${margin.left}" y="${margin.top}" width="${chartWidth}" height="${height-margin.bottom-margin.top}"></rect>${percentAxis(x,margin.top,height-margin.bottom,height)}${marks}<text class="aggregate-axis-title" x="${margin.left+chartWidth/2}" y="${height-2}" text-anchor="middle">LIBERO-confirmed success rate</text></svg>`;
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

  function reasoningMarker(effort, cx, cy, r, color) {
    const common = `fill="#0d1b28" stroke="${color}" stroke-width="2.3"`;
    if (effort === 'medium') return `<path d="M${cx} ${cy-r}L${cx+r} ${cy}L${cx} ${cy+r}L${cx-r} ${cy}Z" ${common}></path>`;
    if (effort === 'high') return `<path d="M${cx} ${cy-r*1.05}L${cx+r*1.05} ${cy+r*.88}L${cx-r*1.05} ${cy+r*.88}Z" ${common}></path>`;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" ${common}></circle>`;
  }

  function costPerformanceChart(rows) {
    const separator = '\u241f';
    const points = aggregateGroups(rows, row => `${row.model}${separator}${row.effort}`).map(([key,group]) => {
      const [model,effort] = key.split(separator);
      const modelRows = rows.filter(row => row.model === model && row.effort === effort);
      const priced = modelRows.filter(row => row.estimated_usd != null);
      const meanCost = priced.length ? priced.reduce((sum,row) => sum + (Number(row.estimated_usd) || 0),0) / priced.length : null;
      const planned = modelRows.length;
      return {model,effort,planned,successes:group.success,rate:planned ? 100*group.success/planned : 0,meanCost,priced:priced.length};
    }).filter(point => point.meanCost != null);
    if (!points.length) return '<span class="mini-chart-empty">No measured cost data</span>';

    const width = 620, height = 340;
    const margin = {top:18,right:24,bottom:52,left:58};
    const plotWidth = width-margin.left-margin.right;
    const plotHeight = height-margin.top-margin.bottom;
    const maxCost = Math.max(...points.map(point => point.meanCost));
    const xMax = Math.max(1,Math.ceil(maxCost));
    const maxRate = Math.max(...points.map(point => point.rate));
    const yMax = Math.min(100,Math.max(50,Math.ceil(maxRate/10)*10));
    const x = value => margin.left + plotWidth*value/xMax;
    const y = value => margin.top + plotHeight*(1-value/yMax);
    const xTicks = Array.from({length:5},(_,index) => xMax*index/4);
    const yTicks = Array.from({length:5},(_,index) => yMax*index/4);
    const grid = [
      ...xTicks.map(value => `<g class="cost-performance-grid"><line x1="${x(value)}" y1="${margin.top}" x2="${x(value)}" y2="${height-margin.bottom}"></line><text x="${x(value)}" y="${height-margin.bottom+18}" text-anchor="middle">$${value.toFixed(value < 1 ? 2 : 1).replace(/\.0$/,'')}</text></g>`),
      ...yTicks.map(value => `<g class="cost-performance-grid"><line x1="${margin.left}" y1="${y(value)}" x2="${width-margin.right}" y2="${y(value)}"></line><text x="${margin.left-9}" y="${y(value)+4}" text-anchor="end">${value.toFixed(0)}%</text></g>`)
    ].join('');
    const modelGroups = new Map();
    points.forEach(point => {
      const list = modelGroups.get(point.model) || [];
      list.push(point);
      modelGroups.set(point.model,list);
    });
    const series = [...modelGroups].sort(([a],[b]) => byModelOrder(a,b)).map(([model,modelPoints]) => {
      const style = modelStyle(model);
      modelPoints.sort((a,b) => byEffortOrder(a.effort,b.effort));
      const line = modelPoints.length > 1 ? `<path class="cost-performance-line" d="${modelPoints.map((point,index) => `${index ? 'L' : 'M'}${x(point.meanCost)} ${y(point.rate)}`).join('')}" stroke="${style.color}"></path>` : '';
      const marks = modelPoints.map(point => {
        const tip = `${modelLabel(model)} · ${reasoningLabel(point.effort)}\nSuccess: ${point.successes}/${point.planned} (${point.rate.toFixed(1)}%)\nMean cost: ${usd(point.meanCost)} per attempt`;
        return `<g class="cost-performance-point" data-tip="${esc(tip)}">${reasoningMarker(point.effort,x(point.meanCost),y(point.rate),7.5,style.color)}<text x="${x(point.meanCost)}" y="${y(point.rate)-13}" text-anchor="middle">${esc(reasoningLabel(point.effort))}</text><circle class="chart-hit" cx="${x(point.meanCost)}" cy="${y(point.rate)}" r="15"></circle></g>`;
      }).join('');
      return line+marks;
    }).join('');
    const modelLegend = [...modelGroups.keys()].sort(byModelOrder).map(model => `<span><i style="--series:${modelStyle(model).color}"></i>${esc(modelLabel(model))}</span>`).join('');
    const reasoningLegend = EFFORT_ORDER.map(effort => `<span><svg viewBox="0 0 14 14" aria-hidden="true">${reasoningMarker(effort,7,7,4,'#9eb2c4')}</svg>${reasoningLabel(effort)}</span>`).join('');
    return `<div class="cost-performance-legend"><div>${modelLegend}</div><div>${reasoningLegend}</div></div><svg class="cost-performance-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Mean API cost per attempt versus success rate for every model and reasoning level">${grid}<line class="cost-performance-axis" x1="${margin.left}" y1="${height-margin.bottom}" x2="${width-margin.right}" y2="${height-margin.bottom}"></line><line class="cost-performance-axis" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height-margin.bottom}"></line>${series}<text class="cost-performance-axis-title" x="${margin.left+plotWidth/2}" y="${height-4}" text-anchor="middle">Mean API cost per attempt</text><text class="cost-performance-axis-title" x="13" y="${margin.top+plotHeight/2}" text-anchor="middle" transform="rotate(-90 13 ${margin.top+plotHeight/2})">Success rate</text></svg>`;
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
    const plannedCounts = [...new Set(rankedModelReasoning(rows).map(entry => entry.planned))];
    $('model-chart-method').textContent = `${plannedCounts.length === 1 ? `${plannedCounts[0]} planned episode${plannedCounts[0] === 1 ? '' : 's'}` : 'Planned episodes'} per configuration · 95% Wilson interval`;
    if ($('state-stats-selection')) $('state-stats-selection').textContent = selection;

    const summaryRows = episodes;
    const modelSummaries = [...new Set(summaryRows.map(row => row.model).filter(Boolean))].sort().map(model => {
      const modelRows = summaryRows.filter(row => row.model === model);
      const successes = modelRows.filter(row => row.success === true).length;
      const planned = modelRows.length;
      const pricedRows = modelRows.filter(row => row.estimated_usd != null);
      return {
        model,
        label:modelLabel(model),
        successes,
        rate:planned ? 100 * successes / planned : 0,
        completed:planned,
        cost:pricedRows.reduce((sum,row) => sum + (Number(row.estimated_usd) || 0), 0),
        costKnown:pricedRows.length > 0
      };
    });
    const successEntries = modelSummaries
      .map(item => ({label:item.label,value:item.rate,successes:item.successes,completed:item.completed,color:modelStyle(item.model).color}))
      .sort((a,b) => (chartSort.success === 'asc' ? a.value-b.value : b.value-a.value) || a.label.localeCompare(b.label));
    const successChart = miniBarChart(successEntries, 100, item => item.completed ? `${item.value.toFixed(0)}% · ${item.successes}/${item.completed}` : '—');
    const costEntries = modelSummaries
      .map(item => ({label:item.label,value:item.cost,costKnown:item.costKnown,color:modelStyle(item.model).color}))
      .sort((a,b) => (chartSort.cost === 'asc' ? a.value-b.value : b.value-a.value) || a.label.localeCompare(b.label));
    const costChart = miniBarChart(costEntries, Math.max(0, ...costEntries.map(item => item.value)), item => item.costKnown ? usd(item.value) : '—');

    $('cards').innerHTML =
      chartCard('Success rate by model', successChart, 'success') +
      chartCard('Measured cost by model', costChart, 'cost') +
      `<article class="summary-card metric-chart-card cost-performance-card" data-chart="efficiency"><header class="metric-chart-heading"><h3 class="metric-chart-title">Cost vs. success by reasoning</h3><span>All data</span></header>${costPerformanceChart(summaryRows)}</article>`;

    const taskEntries = aggregateGroups(rows, row => taskLabel(row.task_id)).map(([name,group]) => ({name,group,attempted:group.completed+group.stopped,rate:group.completed+group.stopped ? 100*group.success/(group.completed+group.stopped) : null}));
    const sortedTaskEntries = sortedForTable(taskEntries,'task',{
      success:entry => entry.group.success,
      rate:entry => entry.rate,
      stopped:entry => entry.group.stopped,
      pending:entry => entry.group.pending,
      cost:entry => entry.group.costKnown ? entry.group.cost : null,
      calls:entry => entry.group.callsKnown ? entry.group.calls : null
    });
    $('task-stats').innerHTML = table(
      ['Task',{label:'Success / attempted',sortKey:'success'},{label:'Rate',sortKey:'rate'},{label:'Stopped early',sortKey:'stopped'},{label:'Pending',sortKey:'pending'},{label:'Cost',sortKey:'cost'},{label:'Calls',sortKey:'calls'}],
      sortedTaskEntries.map(({name,group,attempted,rate}) => cells([name,`${group.success} / ${attempted}`,rate == null ? '—' : `${rate.toFixed(1)}%`,group.stopped,group.pending,group.costKnown ? usd(group.cost) : '—',group.callsKnown ? group.calls : '—'])),
      'Success and cost grouped by task',
      'task'
    );
    $('model-stats').innerHTML = table(
      ['Rank','Model','Reasoning',{label:'Success / planned',sortKey:'success'},{label:'Rate',sortKey:'rate'},{label:'Failures',sortKey:'failures'},{label:'Stopped early',sortKey:'stopped'},{label:'Cost',sortKey:'cost'},{label:'Calls',sortKey:'calls'}],
      modelLeaderboard(rows),
      'Model and reasoning leaderboard ordered by success rate',
      'model'
    );
    $('task-stats-chart').innerHTML = taskComparisonChart(rows);
    $('model-stats-chart').innerHTML = modelReasoningChart(rows);
    $('state-count').textContent = `${rows.length} rollout${rows.length === 1 ? '' : 's'} shown.`;
    const rolloutRows = sortedForTable(rows,'rollout',{
      state:row => row.init_state,
      success:row => row.success === true ? 1 : 0,
      steps:row => row.steps,
      calls:row => row.api_attempts,
      cost:row => row.estimated_usd,
      budget:row => row.budget_charge_usd
    });
    $('episodes').innerHTML = table(
      ['Model','Reasoning','Task',{label:'State',sortKey:'state'},'Status',{label:'Success',sortKey:'success'},{label:'Steps',sortKey:'steps'},{label:'Calls',sortKey:'calls'},{label:'Cost',sortKey:'cost'},{label:'Budget charge',sortKey:'budget'}],
      rolloutRows.map(row => {
        const index = episodes.indexOf(row);
        const statusClass = row.success === true ? 'status-success' : attempted(row) ? 'status-failure' : '';
        return `<tr class="pick" tabindex="0" role="button" data-index="${index}" aria-selected="${row === chosen}">` +
          `<td>${esc(modelLabel(row.model))}</td><td>${esc(reasoningLabel(row.effort))}</td><td>${esc(taskLabel(row.task_id))}</td><td>${esc(row.init_state)}</td>` +
          `<td class="${statusClass}">${esc(statusLabel(row))}</td><td>${row.success === true ? 'Yes' : attempted(row) ? 'No' : 'Pending'}</td>` +
          `<td>${esc(num(row.steps))}</td>` +
          `<td>${esc(num(row.api_attempts))}</td><td>${esc(usd(row.estimated_usd))}</td><td>${esc(usd(row.budget_charge_usd))}</td></tr>`;
      }),
      'Individual experiment states',
      'rollout'
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
    const costs = calls.map(call => Number(call.estimated_usd) || 0);
    const peak = Math.max(.001, ...costs);
    const magnitude = 10 ** Math.floor(Math.log10(peak / 3));
    const step = [1,2,2.5,5,10].map(m => m * magnitude).find(value => peak / value <= 4);
    const top = Math.ceil(peak / step) * step;
    const width = 920, height = 230;
    const margin = {top:22,right:12,bottom:34,left:58};
    const plotWidth = width-margin.left-margin.right, plotHeight = height-margin.top-margin.bottom;
    const slot = plotWidth / calls.length;
    const barWidth = Math.max(1.5, slot - 2);
    const y = value => margin.top + plotHeight * (1 - value / top);
    const peakIndex = costs.indexOf(Math.max(...costs));
    const gridValues = Array.from({length:Math.round(top/step)+1}, (_,i) => i*step);
    const decimals = gridValues.some(value => Math.abs(value*100 - Math.round(value*100)) > 1e-9) ? 3 : 2;
    const grid = gridValues.map(value => `<g class="cost-grid${value === 0 ? ' cost-baseline' : ''}"><line x1="${margin.left}" x2="${width-margin.right}" y1="${y(value)}" y2="${y(value)}"></line><text x="${margin.left-10}" y="${y(value)+4}" text-anchor="end">$${value.toFixed(decimals)}</text></g>`).join('');
    const tickEvery = calls.length > 40 ? 10 : calls.length > 15 ? 5 : 1;
    const ticks = calls.map((call,index) => (index === 0 || (index+1) % tickEvery === 0) ? `<text x="${margin.left+index*slot+slot/2}" y="${height-12}" text-anchor="middle">${index+1}</text>` : '').join('');
    const bars = calls.map((call,index) => {
      const x = margin.left + index*slot + (slot-barWidth)/2;
      const barTop = y(costs[index]);
      const tip = [
        `Call ${call.call ?? index+1}`,
        `Cost: ${usd(call.estimated_usd)}`,
        `Input ${num(call.input_tokens)} · cached ${num(call.cached_tokens)}`,
        `Output ${num(call.output_tokens)} · reasoning ${num(call.reasoning_tokens)}`,
        call.latency_s == null ? '' : `Latency: ${Number(call.latency_s).toFixed(1)} s`,
        (call.tools || []).length ? `Tools: ${call.tools.join(', ')}` : ''
      ].filter(Boolean).join('\n');
      return `<g class="cost-bar" data-tip="${esc(tip)}"><rect class="chart-hit" x="${margin.left+index*slot}" y="${margin.top}" width="${slot}" height="${plotHeight}"></rect><path class="cost-bar-fill" d="M${x} ${y(0)}V${barTop+Math.min(2,(y(0)-barTop)/2)}q0 -2 2 -2h${barWidth-4}q2 0 2 2V${y(0)}Z"></path></g>`;
    }).join('');
    const peakX = margin.left + peakIndex*slot + slot/2;
    const anchor = peakIndex > calls.length*.8 ? 'end' : peakIndex < calls.length*.2 ? 'start' : 'middle';
    const peakLabel = `<text class="cost-peak-label" x="${peakX}" y="${y(costs[peakIndex])-8}" text-anchor="${anchor}">Peak ${usd(costs[peakIndex])} · call ${peakIndex+1}</text>`;
    $('token-plot').innerHTML = `<svg class="cost-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Estimated cost of each API call in this rollout">${grid}${bars}${peakLabel}${ticks}<text class="cost-axis-title" x="${margin.left+plotWidth/2}" y="${height}" text-anchor="middle">API call</text></svg>`;
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
      context.lineWidth=1; context.font="11px 'Instrument Sans', sans-serif";
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
  document.addEventListener('click', event => {
    const button = event.target.closest('.table-sort-toggle[data-sort-table][data-sort-key]');
    if (!button) return;
    const state = tableSort[button.dataset.sortTable];
    if (!state) return;
    if (state.key === button.dataset.sortKey) state.direction = state.direction === 'desc' ? 'asc' : 'desc';
    else {
      state.key = button.dataset.sortKey;
      state.direction = button.dataset.sortType === 'text' ? 'asc' : 'desc';
    }
    draw();
  });
  function setAggregateView(card, flipped) {
    const front = card.querySelector('.aggregate-front');
    const back = card.querySelector('.aggregate-back');
    card.classList.toggle('is-flipped', flipped);
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    front.querySelectorAll('.aggregate-view-toggle').forEach(button => { button.tabIndex = flipped ? -1 : 0; });
    back.querySelectorAll('.aggregate-view-toggle').forEach(button => { button.tabIndex = flipped ? 0 : -1; });
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
    const flipped = button.dataset.view === 'graph';
    if (flipped === card.classList.contains('is-flipped')) return;
    setAggregateView(card,flipped);
    setGraphHash(flipped ? card.dataset.graphAnchor : card.id);
    card.querySelector(`${flipped ? '.aggregate-back' : '.aggregate-front'} [data-view="${button.dataset.view}"]`)?.focus({preventScroll:true});
  }));
  window.addEventListener('hashchange', applyGraphHash);

  const chartTooltip = document.createElement('div');
  chartTooltip.className = 'chart-tooltip';
  chartTooltip.setAttribute('role','tooltip');
  chartTooltip.hidden = true;
  document.body.append(chartTooltip);
  let tipTarget = null;
  function placeTooltip(clientX, clientY) {
    const box = chartTooltip.getBoundingClientRect();
    const left = clientX + 16 + box.width > innerWidth - 8 ? clientX - 16 - box.width : clientX + 16;
    const top = Math.min(innerHeight - box.height - 8, Math.max(8, clientY - box.height / 2));
    chartTooltip.style.transform = `translate(${Math.max(8,left)}px,${top}px)`;
  }
  function showTooltip(target, clientX, clientY) {
    if (target !== tipTarget) {
      tipTarget?.classList.remove('is-hovered');
      tipTarget = target;
      target.classList.add('is-hovered');
      const [title, ...lines] = target.dataset.tip.split('\n');
      chartTooltip.innerHTML = `<strong>${esc(title)}</strong>${lines.map(line => `<span>${esc(line)}</span>`).join('')}`;
      chartTooltip.hidden = false;
    }
    placeTooltip(clientX, clientY);
  }
  function hideTooltip() {
    tipTarget?.classList.remove('is-hovered');
    tipTarget = null;
    chartTooltip.hidden = true;
  }
  document.addEventListener('pointermove', event => {
    const target = event.target.closest?.('[data-tip]');
    if (target) showTooltip(target, event.clientX, event.clientY);
    else if (tipTarget) hideTooltip();
  });
  document.addEventListener('pointerdown', event => { if (!event.target.closest?.('[data-tip]')) hideTooltip(); });
  addEventListener('scroll', hideTooltip, {passive:true});

  window.addEventListener('popstate', () => { urlStateEnabled=Boolean(location.search); applyUrlState(); draw(); });
  applyUrlState();
  applyGraphHash();
  draw();

  if (typeof module !== 'undefined' && module.exports) module.exports = {googleDriveEmbedUrl, attempted};
})(typeof window === 'undefined' ? globalThis : window);
