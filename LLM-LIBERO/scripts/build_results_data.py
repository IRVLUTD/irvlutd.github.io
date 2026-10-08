"""Build the static dashboard data from experiment results and Drive videos."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[1]
DEFAULT_RESULTS = PROJECT.parent / 'public' / 'data' / 'experiment_results.json'
DEFAULT_VIDEOS = PROJECT / 'tests' / 'drive_videos.json'
DEFAULT_OUTPUT = PROJECT / 'assets' / 'js' / 'results-data.js'
COLORS = ['#79c4ff', '#70dab5', '#c39bff', '#ffb071', '#ff78b7']
MODEL_COLORS = {
    'anthropic/claude-opus-5-5': '#79c4ff',
    'openai/gpt-6-astra': '#70dab5',
    'openai/gpt-6-luna': '#c39bff',
    'openai/gpt-6.1-sol': '#ffb071',
    'openai/gpt-6-sol': '#ff78b7',
}
LEVELS = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]


def model_name(raw):
    parts = re.split(r'[-_]+', raw.split('/')[-1])
    return '-'.join(part.upper() if part.lower() in {'gpt', 'llm'} else part.title() for part in parts)


def episode_key(row):
    identity = '|'.join(str(row.get(key, '')) for key in ('model', 'effort', 'task_id', 'init_state'))
    return hashlib.sha256(identity.encode()).hexdigest()


def match_key(row, effort_field='effort'):
    return row.get('model'), row.get(effort_field), row.get('task_id'), row.get('init_state')


def compact_calls(calls):
    fields = (
        'call', 'input_tokens', 'cached_tokens', 'output_tokens', 'reasoning_tokens',
        'estimated_usd', 'latency_s', 'http_status', 'usage_unknown', 'step', 'video_time_s',
    )
    compact = []
    for call in calls or []:
        item = {field: call.get(field) for field in fields if call.get(field) is not None}
        tools = []
        for tool in call.get('tools') or []:
            name = tool.get('name') if isinstance(tool, dict) else str(tool)
            if name and name not in tools:
                tools.append(name)
        if tools:
            item['tools'] = tools
        first_tool = next((tool for tool in call.get('tools') or [] if isinstance(tool, dict)), None)
        arguments = first_tool.get('arguments') if first_tool else None
        targets = arguments.get('targets') if isinstance(arguments, dict) else None
        if isinstance(targets, dict) and all(targets.get(axis) is not None for axis in ('x', 'y', 'z')):
            item['target_xyz'] = [targets['x'], targets['y'], targets['z']]
        observed = call.get('observed_xyz')
        if isinstance(observed, list) and len(observed) >= 3:
            item['observed_xyz'] = observed[:3]
        note = arguments.get('note') if isinstance(arguments, dict) else None
        if note:
            item['plan_note'] = str(note)[:360]
        compact.append(item)
    return compact


def compact_trajectory(points, limit=240):
    points = points or []
    if len(points) > limit:
        indexes = sorted({round(i * (len(points) - 1) / (limit - 1)) for i in range(limit)})
        points = [points[index] for index in indexes]
    compact = []
    for index, point in enumerate(points):
        if isinstance(point, dict):
            xyz = point.get('xyz') or []
            if len(xyz) >= 3:
                compact.append([point.get('step', index), xyz[0], xyz[1], xyz[2], point.get('gripper')])
        elif isinstance(point, (list, tuple)) and len(point) >= 3:
            compact.append(list(point[:5]))
    return compact


def build(results_index, video_index):
    source_episodes = results_index.get('episodes', [])
    videos = video_index.get('videos', [])
    video_by_episode = {match_key(row, 'reasoning'): row for row in videos}
    raw_models = sorted({row['model'] for row in source_episodes})
    model_ids = {raw: f'model-{chr(97 + i)}' for i, raw in enumerate(raw_models)}
    models = [
        {'id': model_ids[raw], 'name': model_name(raw), 'color': MODEL_COLORS.get(raw, COLORS[i % len(COLORS)]), 'source': raw}
        for i, raw in enumerate(raw_models)
    ]
    for i in range(len(models), 4):
        models.append({'id': f'model-{chr(97 + i)}', 'name': f'Model {chr(65 + i)} (pending)', 'color': COLORS[i]})

    task_rows = defaultdict(list)
    for row in source_episodes:
        task_rows[row['task_id']].append(row)
    tasks = []
    for task_id, rows in sorted(task_rows.items()):
        videos_for_task = [video_by_episode.get(match_key(row)) for row in rows]
        source = next((row for row in videos_for_task if row), {})
        tasks.append({
            'id': f'task-{task_id}',
            'name': f'Task {task_id + 1}',
            'description': source.get('instruction') or source.get('task_name') or f'LIBERO task {task_id + 1}',
            'benchmarkName': source.get('task_name'),
        })

    grouped = defaultdict(list)
    for row in source_episodes:
        grouped[(row['model'], row['effort'])].append(row)
    results = []
    for (raw_model, level), rows in sorted(grouped.items()):
        per_task = {}
        for task_id in sorted({row['task_id'] for row in rows}):
            subset = [row for row in rows if row['task_id'] == task_id]
            per_task[f'task-{task_id}'] = {
                'successes': sum(row.get('success') is True for row in subset),
                'total': len(subset),
            }
        results.append({
            'model': model_ids[raw_model],
            'level': level,
            'successes': sum(row.get('success') is True for row in rows),
            'total': len(rows),
            'costUsd': sum(row.get('estimated_usd') or 0 for row in rows),
            'tasks': per_task,
        })

    rollouts = []
    episodes = []
    for row in source_episodes:
        video_row = video_by_episode.get(match_key(row)) or {}
        state = row.get('init_state')
        episode = row.get('episode')
        key = video_row.get('key') or episode_key(row)
        exported_video = row.get('video') if isinstance(row.get('video'), dict) else {}
        video = (
            video_row.get('preview_url') or video_row.get('view_url')
            or exported_video.get('preview_url') or exported_video.get('view_url')
        )
        task_name = video_row.get('task_name')
        instruction = video_row.get('instruction')
        rollouts.append({
            'id': key,
            'task': f'task-{row["task_id"]}',
            'model': model_ids[row['model']],
            'level': row['effort'],
            'label': f'State {state} · Episode {episode}',
            'outcome': 'success' if row.get('success') is True else 'failure',
            'video': video,
            'details': {
                'Status': row.get('status') or 'Not supplied',
                'Initial state': str(state) if state is not None else 'Not supplied',
                'Episode': str(episode) if episode is not None else 'Not supplied',
                'Estimated cost': f'${row["estimated_usd"]:.4f}' if row.get('estimated_usd') is not None else 'Not supplied',
            },
        })

        episodes.append({
            'id': key,
            'model': model_name(row['model']),
            'model_source': row['model'],
            'effort': row['effort'],
            'task_id': row['task_id'],
            'task_name': task_name,
            'instruction': instruction,
            'init_state': state,
            'episode': episode,
            'run': row.get('run'),
            'status': row.get('status') or ('success' if row.get('success') is True else 'failure'),
            'success': row.get('success'),
            'reviewed_success': row.get('reviewed_success'),
            'review_note': row.get('review_note'),
            'steps': row.get('steps'),
            'api_attempts': row.get('api_attempts'),
            'estimated_usd': row.get('estimated_usd'),
            'budget_charge_usd': row.get('budget_charge_usd'),
            'input_tokens': row.get('input_tokens'),
            'cached_tokens': row.get('cached_tokens'),
            'output_tokens': row.get('output_tokens'),
            'reasoning_tokens': row.get('reasoning_tokens'),
            'latency_s': row.get('latency_s'),
            'metrics': row.get('metrics') or {},
            'stop_detail': row.get('stop_detail'),
            'framework_status': row.get('framework_status'),
            'video': video,
            'calls': compact_calls(row.get('calls')),
            'trajectory': compact_trajectory(row.get('trajectory')),
            'conversation': row.get('conversation') or [],
            'protocol': row.get('protocol') or {
                'model': row['model'],
                'reasoning_effort': row['effort'],
                'task_id': row['task_id'],
                'task_name': task_name,
                'instruction': instruction,
                'initial_state': state,
            },
        })

    return {
        'meta': {
            'version': results_index.get('version'),
            'createdAt': results_index.get('created_at'),
            'campaign': results_index.get('campaign'),
            'totals': results_index.get('totals'),
            'videoCount': sum(bool(row['video']) for row in rollouts),
        },
        'models': models,
        'levels': [{'id': key, 'name': name} for key, name in LEVELS],
        'tasks': tasks,
        'results': results,
        'rollouts': rollouts,
        'episodes': episodes,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--results-input', type=Path, default=DEFAULT_RESULTS)
    parser.add_argument('--videos-input', type=Path, default=DEFAULT_VIDEOS)
    parser.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    data = build(
        json.loads(args.results_input.read_text()),
        json.loads(args.videos_input.read_text()),
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        '/* Generated by scripts/build_results_data.py. Do not edit by hand. */\n'
        f'window.LIBERO_DATA={json.dumps(data, separators=(",", ":"), ensure_ascii=False)};\n'
    )
    print(
        f'Wrote {len(data["episodes"])} episodes, {data["meta"]["videoCount"]} videos, '
        f'and {len(data["results"])} measured configurations to {args.output}'
    )


if __name__ == '__main__':
    main()
