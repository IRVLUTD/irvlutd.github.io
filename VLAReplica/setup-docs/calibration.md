# Calibration

[Back to project page](../../index.html)

## SO-101 arm calibration

1. Follow the LeRobot SO-101 calibration process.
2. Ensure all motors are at their middle position before starting.
3. Copy the generated calibration JSON into `calibration/robots/so101_follower`.
4. Rename it to `so101_follower_arm.json`.

## Top camera calibration

Adjust the camera until the AprilTag pose matches Table A.2.

| X (m) | Y (m) | Z (m) | R (deg) | P (deg) | Y (deg) |
| --- | --- | --- | --- | --- | --- |
| -0.06 ± 0.01 | -0.39 ± 0.01 | 1.25 ± 0.01 | -18.5 ± 1.0 | 3.0 ± 1.0 | 2.5 ± 1.0 |

```
python calibration/camera/detect_apriltag.py
```

## Visual overlay matching

After the AprilTag pose is close, use overlay matching to align the top and wrist camera views
with the reference images.

```
python calibration/camera/overlay.py --base-cam <id> --top-cam
python calibration/camera/overlay.py --base-cam <id> --wrist-cam
```

## Action normalization

The benchmark converts policy outputs from the original SO-101 arm into the action space of the
current setup using the universal action-space transform described in Eq. (3). This is what allows
policies to transfer across independently assembled robots.
