# System Calibration

[Back to project page](../../index.html)

## SO-101 arm calibration

Calibration video from LeRobot: 

<figure style="text-align: center; margin: 20px auto; max-width: 800px;">
  <video 
    controls 
    preload="metadata" 
    style="width: 75%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <source src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/calibrate_so101_2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="color: #555; margin-top: 12px; font-weight: bold;">
    Video 1: SO-101 Arm Calibration Procedure.
  </figcaption>
</figure>

1. Calibrate the SO-101 follower according to the [LeRobot Docs](https://huggingface.co/docs/lerobot/so101?setup_motors=Command#calibrate). __Follow the video carefully, and ensure each motor is at the middle position before starting the calibration process.__ 
    * (*Note: This means for the wrist roll motor, the end-effector should be oriented so that the camera is rotated 90° and pointing towards the right side when looking at the end-effector head on*)
    * During calibration, thoroughly rotate each of the six motors to their physical joint limits. Don't forget any motors!

2. After calibration is complete, the ```calibration.json``` file is typically saved to ```~/.cache/huggingface/lerobot/calibration/robots/<your-robot-id>``` in your root folder. Copy the generated calibration JSON file into `vlareplica/calibration/robots/so101_follower` inside your repo directory.
3. Rename it to `so101_follower_arm.json`.

## Camera Calibration

We first utilize an AprilTag mounted at a defined spot with respect to the box to allow general placement of the camera mount. Then, we utilize the idea of an *image overlay* to match the camera pose to the original VLA-Replica box camera pose as closely as possible.

### AprilTag calibration

1. In a new terminal inside the virtual environment, run the calibration script (replace your-top-camera-index with the number you recorded in __Software Installation__):

    ```python calibration/camera/detect_apriltag.py --camera-index <your-top camera-index>```
    
    A GUI window will pop up, displaying the live camera feed alongside the estimated AprilTag pose. 

    <figure style="text-align: center; margin: 20px auto;">
  <img src="../images/app/apriltag_gui.png" width=1200 style="height: auto; border-radius: 4px" alt="System overview diagram">
  <figcaption style=" color: #555; margin-top: 8px;">
    AprilTag camera calibration GUI. The live camera feed (left) and the detected AprilTag pose table (right) are shown simultaneously. Adjust the camera position until the pose values match the table below.
  </figcaption>
    </figure>

2. Reach inside the box and physically slide or tilt the camera mount along the PVC pipe until all reported values match the table below as close as possible (some error is acceptable):

    | X (m) | Y (m) | Z (m) | R (deg) | P (deg) | Y (deg) |
    | --- | --- | --- | --- | --- | --- |
    | -0.06 ± 0.01 | -0.39 ± 0.01 | 1.25 ± 0.01 | -18.5 ± 1.0 | 3.0 ± 1.0 | 2.5 ± 1.0 |

    Once satisfied, press `q` to exit the program.

### Image Overlay Calibration

Although the AprilTag pose estimator may output values close to Table A.2, there may still be slight camera misalignment. To solve this, we utilize visual overlay matching (see below) to ensure the camera view is as close as possible to VLA-REPLICA’s original view.

<figure style="text-align: center; margin: 20px auto; max-width: 800px;">
  <video 
    controls 
    preload="metadata" 
    style="width: 75%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <source src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/calibrate_so101_2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="color: #555; margin-top: 12px; font-weight: bold;">
    Video 2: Image Overlay Calibration Procedure.
  </figcaption>
</figure>

1. First, calibrate the top camera for the second time. Run the following (replacing `your-top-camera-id` with with the number you recorded in __Software Installation__): 
    ```python calibration/camera/overlay.py --overlay-image-folder calibration/camera/referenceImages/top --base-cam <your-top-camera-id>```

    A GUI window will pop up, overlaying the live top camera feed with a wrist view reference image. Match the view of your camera with the reference image by reaching into the box and sliding or tilting the camera mount along the PVC pipe.

2. Next, calibrate the wrist camera. Run the following (replacing `your-wrist-camera-id` with with the number you recorded in __Software Installation__): 
    ```python calibration/camera/overlay.py --overlay-image-folder calibration/camera/referenceImages/wrist --base-cam <your-wrist-camera-id>```

    A GUI window will pop up, overlaying the live wrist camera feed with a top view reference image. Slightly loosen the M3 screw on the wrist camera mount on the SO-101, and match the view of your camera with the reference image by rotating the camera mount along the end effector.

<figure style="text-align: center; margin: 20px auto;">
<img src="../images/app/visual_calibration.png" width=1200 style="height: auto; border-radius: 4px" alt="System overview diagram">
<figcaption style=" color: #555; margin-top: 8px;">
Visual calibration GUI. Top camera (top) and wrist camera (bottom) calibration over time. The cameras are adjusted physically until the overlay match the reference image.
</figcaption>
</figure>
__Before the next step, ensure that:__

- All six pose values (x,y,z,R,P,Y) match the targets in the table:
    -     | X (m) | Y (m) | Z (m) | R (deg) | P (deg) | Y (deg) |
    | --- | --- | --- | --- | --- | --- |
    | -0.06 ± 0.01 | -0.39 ± 0.01 | 1.25 ± 0.01 | -18.5 ± 1.0 | 3.0 ± 1.0 | 2.5 ± 1.0 |
- Reference images and camera views match almost identically for both top and wrist cameras.

Congrats! The environment setup is complete, and you are ready to start benchmarking your VLA models!

__Next Step: Running Evaluations ➜__
