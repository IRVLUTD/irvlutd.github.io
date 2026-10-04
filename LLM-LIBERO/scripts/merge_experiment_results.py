"""Merge a newer partial experiment export into the website's full results index."""
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[1]
DEFAULT_BASE = PROJECT.parent / "public" / "data" / "experiment_results.json"
NUMBER_FIELDS = (
    "steps",
    "api_attempts",
    "estimated_usd",
    "budget_charge_usd",
    "input_tokens",
    "cached_tokens",
    "output_tokens",
    "reasoning_tokens",
    "latency_s",
)


def episode_key(row):
    return tuple(row.get(field) for field in ("model", "effort", "task_id", "init_state"))


def merge_calls(base_calls, update_calls):
    base_by_call = {call.get("call"): call for call in base_calls or []}
    merged = []
    for call in update_calls or []:
        item = dict(base_by_call.get(call.get("call"), {}))
        item.update(call)
        merged.append(item)
    return merged


def merge_episode(base, update):
    same_run = base.get("run") == update.get("run")
    merged = dict(base) if same_run else {}
    merged.update(update)
    if same_run and update.get("calls") is not None:
        merged["calls"] = merge_calls(base.get("calls"), update.get("calls"))
    return merged


def aggregate(rows):
    attempted = [row for row in rows if row.get("success") is not None]
    successes = sum(row.get("success") is True for row in attempted)
    failures = sum(row.get("success") is False for row in attempted)
    totals = {
        "scheduled": len(rows),
        "attempted": len(attempted),
        "successes": successes,
        "failures": failures,
        "unknown_outcomes": 0,
        "pending_or_missing": len(rows) - len(attempted),
        "success_rate": successes / len(attempted) if attempted else None,
    }
    for field in NUMBER_FIELDS:
        totals[field] = sum(row.get(field) or 0 for row in attempted)
    return totals


def rebuild_groups(rows):
    groups = defaultdict(list)
    for row in rows:
        groups[(row.get("model"), row.get("effort"), row.get("task_id"))].append(row)
    output = []
    for (model, effort, task_id), group in sorted(groups.items()):
        item = {"model": model, "effort": effort, "task_id": task_id}
        item.update(aggregate(group))
        output.append(item)
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("update", type=Path, help="Newer full or partial results export")
    parser.add_argument("--base", type=Path, default=DEFAULT_BASE)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    base = json.loads(args.base.read_text())
    update = json.loads(args.update.read_text())
    update_by_key = {episode_key(row): row for row in update.get("episodes", [])}
    base_by_key = {episode_key(row): row for row in base.get("episodes", [])}

    missing = sorted(set(update_by_key) - set(base_by_key))
    if missing:
        raise ValueError(f"Update contains {len(missing)} episodes absent from the base index")

    episodes = [
        merge_episode(row, update_by_key[episode_key(row)])
        if episode_key(row) in update_by_key else row
        for row in base.get("episodes", [])
    ]
    merged = dict(base)
    merged["version"] = max(base.get("version", 0), update.get("version", 0))
    merged["created_at"] = max(base.get("created_at", ""), update.get("created_at", ""))
    merged["episodes"] = episodes
    merged["totals"] = aggregate(episodes)
    merged["by_model_task"] = rebuild_groups(episodes)

    output = args.output or args.base
    output.write_text(
        json.dumps(merged, separators=(",", ":"), ensure_ascii=False) + "\n"
    )
    changed_runs = sum(
        base_by_key[key].get("run") != row.get("run")
        for key, row in update_by_key.items()
    )
    print(
        f"Merged {len(update_by_key)} episodes into {len(episodes)} total; "
        f"{changed_runs} replacement runs; {merged['totals']['attempted']} attempted; "
        f"{merged['totals']['successes']} successes."
    )


if __name__ == "__main__":
    main()
