# Parameters and Configuration

Connect to each driver individually via RS232 cable and configure the following parameters using [**Leadshine Motion Studio**](https://www.leadshine.com/download/Software.html) software.

> **⚠ Warning:** Ensure **Adaptive Baudrate** is **unchecked** while connecting to the drivers. All drivers are supposed to be configured at **38400 baud**.

### Parameter Settings



| Parameter | Description | ID 1 (Motor A) | ID 2 (Motor B) | ID 3 (Motor C) |
|:----------|:------------|:---------------:|:---------------:|:---------------:|
| **PA0.00** | Motor ID | 1 | 2 | 3 |
| **PA0.01** | Open/Close Loop | 2 (closed Loop) | 2 (closed Loop) | 0 (Open Loop) |
| **PA0.02** | Control Mode | 1 | 1 | 1 |
| **PA5.00** | Peak Current | 28 | 28 | 10 |
| **PA5.01** | Closed loop holding Current % | 100 | 100 | 50 |
| **PA5.01** | Open loop holding Current % | 100 | 100 | 70 |
| **PA5.03** | Lock Shaft Current % | 100 | 100 | 30 |
| **PR8.00** | PR Control Setting | 0 | 0 | 0 |
| **PR8.10** | Homing Method | 0 (CCW by limit) | 1 (CW by limit) | 1 (CW by limit) |

> \* Values below 30% on Motor C (ID 3) will trigger a **Lock Shaft Alarm**.  
> **PR8.00 = 0** disables auto-homing on boot, so we can control when to home the motors.

### I/O Settings

Navigate to **Configuration > IO Setting > Input** and assign the limit switch inputs:

| Input Pin | Function |
|:----------|:---------|
| **PA4.07 SI6** | Negative Limit Input--PR(NOT) |
| **PA4.08 SI7** | Positive Limit Input--PR(POT) |


The Pneumatic valve is controlled by the output from driver connected to **Motor C (ID 3)**. The valve is activated whenever Motor C reaches the target position ( i.e., motor is now assumed to be infront of miner to be cleaned). To achieve this, we use the **CMD_OK** function of the driver. 

Navigate to **Configuration > IO Setting > Output** and assign the following:

| Output Pin | Function |
|:----------|:---------|
| **PA4.11 SO1** | Path Completed (CMD_OK) |

<!-- The SO1 output function is set via **PA4.11** (register `0x0157`). Available options:

| PA4.11 Value | Code | Symbol | Description |
|:-------------|:----:|:------:|:------------|
| 0 | — | Invalid | Output disabled (direct register `0x017B` does **not** work) |
| 32 | 0x20 | **CMD_OK** | HIGH when drive is idle / command complete (**✅ Used**) |
| 33 | 0x21 | MC_OK | HIGH when path position is reached |
| 34 | 0x22 | HOME_OK | HIGH when homing is complete |
| 35 | 0x23 | INP | HIGH when positioning is complete within tolerance |
| 36 | 0x24 | BRK | HIGH when brake is released (motor enabled) |
| 37 | 0x25 | ALM | HIGH on alarm/fault condition | -->

> ℹ️  After setting the parameters, write them to the driver using the **Write to Driver** button present on the top row of the Parameter List tab. To make sure the values are set permanently, click on **Save to Driver** button, then disconnect the power supply of the driver and connect it back again after at least 15-20 seconds.

### Loading Pre-set Parameter files

We have pre-set parameter files for each motor. You can load them using the **Read Parameter files** button and then write and save to the driver.

| Motor | Parameter File |
|:------|:---------------|
| Motor A | [Motor A.par](Motor_A.par) |
| Motor B | [Motor B.par](Motor_B.par) |
| Motor C | [Motor C.par](Motor_C.par) |    