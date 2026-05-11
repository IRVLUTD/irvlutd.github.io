# Running evaluations

[Back to project page](../../index.html)

## benchmark.py

Use the evaluation script to run a policy across ID or OOD tasks.

```
python benchmark.py \
  --policy-type pi0 \
  --policy-path lerobot/pi0_base \
  --policy-from-hub \
  --run-all-tasks \
  --task-subset ID \
  --iterations 5 \
  --eval-follower-calib-dirs calibration/robots/so101_follower \
  --eval-follower-ports /dev/ttyACM1 \
  --eval-follower-ids so101_follower_arm \
  --eval-top-indexes 4 \
  --eval-wrist-indexes 14 \
  --reset-mode fixed \
  --reset-action-file arm_reset.json
```

## Evaluation loop

1. Set up the test scene using the reference image.
2. Match the live top-camera view to the overlay.
3. Press Enter to start the policy.
4. Let the policy run for up to 90 seconds.
5. Log success, failure, and reset behavior for each iteration.

## ID versus OOD evaluation

- ID tasks use scene layouts close to the training distribution.
- OOD tasks test color, count, or object-layout generalization.
