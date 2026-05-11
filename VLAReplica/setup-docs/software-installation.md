# Software installation

[Back to project page](../../index.html)

## Repository setup

```
git clone https://github.com/IRVLUTD/VLAReplica.git
cd VLAReplica
conda env create -f environment.yml
conda activate vlareplica
```

## Detect camera and USB indices

```
lerobot-find-cameras
```

Record the camera indices and the USB serial port for the follower arm.

## LeRobot integration

- Use the LeRobot SO-101 documentation for arm assembly and calibration.
- Use the provided wrist mount guide for the webcam hardware.
