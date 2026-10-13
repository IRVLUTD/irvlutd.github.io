# Register Mapping and Control

All communication uses **Modbus RTU** over RS485 at 38400 baud. Function codes used: **0x03** (Read Holding Registers), **0x06** (Write Single Register), **0x10** (Write Multiple Registers).

### Control Registers

| Register | Name | R/W | Description | Values Used |
|:---------|:-----|:---:|:------------|:------------|
| `0x000F` | Servo Enable | W | Enable/disable the servo drive | `0x0001` = Enable |
| `0x1801` | Fault Clear | W | Clear an active fault/alarm | `0x1111` = Clear all |
| `0x6002` | Command Register | W | Multi-purpose command control | See table below |

#### Command Register (0x6002) Values

| Value | Command | Description |
|:-----:|:--------|:------------|
| `0x0000` | Clear | Clear the command register |
| `0x0021` | Set Zero | Zero the encoder / position counter |
| `0x0040` | Quick Stop | Immediately halt all motion |

### Status Registers

| Register | Name | R/W | Description |
|:---------|:-----|:---:|:------------|
| `0x1003` | Drive Status Word | R | Bit-packed status flags (see bit map below) |
| `0x1012` | Position (open-loop) | R | 32-bit position counter (2 registers) |
| `0x1014` | Position (encoder) | R | 32-bit encoder position (2 registers) |
| `0x602E` | Digital Input Status | R | Bit-packed limit switch states |

### PR Path Registers (0x6200–0x6207)

Writes to these 8 consecutive registers configure and trigger a motion path:

| Offset | Register | Name | Position Mode (`0x0001`) | Velocity Mode (`0x0002`) | Homing Mode (`0x0003`) |
|:------:|:---------|:-----|:-------------------------|:-------------------------|:-----------------------|
| +0 | `0x6200` | Mode | `0x0001` | `0x0002` | `0x0003` |
| +1 | `0x6201` | Position High | Target pos (bits 31–16) | `0x0000` | `0x0000` |
| +2 | `0x6202` | Position Low | Target pos (bits 15–0) | `0x0000` | `0x0000` |
| +3 | `0x6203` | Velocity | Travel speed (RPM) | Signed velocity (RPM) | `0x0000` |
| +4 | `0x6204` | Acceleration | Accel rate | Accel rate | Accel rate |
| +5 | `0x6205` | Deceleration | Decel rate | Decel rate | Decel rate |
| +6 | `0x6206` | Delay | `0x0000` | `0x0000` | `0x0000` |
| +7 | `0x6207` | Trigger | `0x0010` | `0x0010` | `0x0010` |

> **Note:** All 8 registers are written atomically using Modbus function code **0x10** (Write Multiple Registers).

### Status Word Bit Map (0x1003)

| Bit | Mask | Name | Description |
|:---:|:----:|:-----|:------------|
| 0 | `0x0001` | Fault | Drive has faulted (e.g., limit switch hit during motion) |
| 5 | `0x0020` | Path Complete | Current position path has finished |
| 6 | `0x0040` | Homing Complete | The homing routine has finished |

### Digital Output Functions (PA4.11)

| PA4.11 Value | N.O. Code | N.C. Code | Symbol | Trigger Condition |
|:-------------|:---------:|:---------:|:------:|:------------------|
| 32 | `0x20` | `0xA0` | CMD_OK | Any command completes (drive goes idle) |
| 33 | `0x21` | `0xA1` | MC_OK | Path/position move reaches target |
| 34 | `0x22` | `0xA2` | HOME_OK | Homing routine completes |
| 35 | `0x23` | `0xA3` | INP | Motor settles within position tolerance |
| 36 | `0x24` | `0xA4` | BRK | Brake releases (servo enabled) |
| 37 | `0x25` | `0xA5` | ALM | Alarm/fault is active |
