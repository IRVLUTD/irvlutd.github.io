(function (root) {
  'use strict';
  const data = root.LIBERO_DATA || {};
  const episodes = data.episodes || [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const usd = value => value == null ? '—' : `$${Number(value).toFixed(3)}`;
  const num = value => value == null ? '—' : Number(value).toLocaleString();
  const taskLabel = id => `Task ${Number(id) + 1}`;

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
  let spatialController = null;

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
      drawCalls([]); drawTrajectory([]); drawReasoning([]);
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
    drawCalls(row.calls || []);
    spatialController?.destroy();
    spatialController = drawTrajectory(row.trajectory || [], row.calls || []);
    drawReasoning(row.calls || []);
    showMedia(row, spatialController);
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
