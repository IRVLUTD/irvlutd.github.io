# Software installation

[Back to project page](../../index.html)

## Repository setup

VLA-REPLICA utilizes a simple Python script for benchmarking as well as the LeRobot library for SO-101 control. 

GPU VRAM usage is heavy during inference, especially for more complex VLAs like pi0.5, so a GPU with at least 24GB VRAM is recommended.

Clone the repository, create a new virtual environment (recommended) and install prequisites listed in the ```environments.yml``` file:

```
git clone https://github.com/IRVLUTD/VLAReplica.git
cd VLAReplica
conda env create -f environment.yml
conda activate vlareplica
```

## Detect camera and USB indices

Since the camera indices on every computer can vary, utilize leRobot's find-cameras command to list out the corresponding index numbers for the RealSense and Vinmooog cameras:
```
lerobot-find-cameras
```
Record the camera indices for two cameras.

Since the USB serial port on every computer can vary, utilize leRobot's find-port command to list out the corresponding serial port of the SO-101 follower arm. Run the following command:
```
lerobot-find-port
```
and then unplug the SO-101 USB cable from the computer, and then press ```Enter```. 

Record the serial port (e.g. ```/dev/ttyACM1```) for the follower arm.

__Next Step: System Calibration ➜__