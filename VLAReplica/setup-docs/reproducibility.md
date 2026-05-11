# Reproducing across sites

[Back to project page](../../index.html)

## Transferring a policy to a new arm

Use the action normalization procedure to map policy outputs from the original robot embodiment
to a newly assembled SO-101 arm.

## Verifying reproducibility

1. Rebuild the benchmark at a new site.
2. Calibrate the cameras and the follower arm.
3. Run the same ID and OOD task subset used in the paper.
4. Compare success rates to the published results.

The key reproducibility claim is that independently assembled setups should achieve comparable
performance when the assembly and calibration steps are followed carefully.
