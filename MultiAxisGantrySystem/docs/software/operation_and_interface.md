# Operation and Interface

## Operating Modes

### Calibration (`C`)

1. Homes all active motors to their respective limit switches.
2. Zeros all position counters.
3. Simultaneously jogs all motors toward their opposite (far) limits.
4. Records far limit positions and computes Motor C's travel range.
5. Saves calibration data to EEPROM.
6. Re-homes all motors and zeros positions again.
7. Computes Motor C's time-per-step from its calibrated range.

### Homing (`H`)

1. Loads previously saved calibration from EEPROM.
2. Homes all motors to their respective limit switches.
3. Zeros positions and computes Motor C's time-per-step.
4. System is ready for positioning commands without re-calibrating.

### Manual Positioning (`RC`)

Two-digit serial command: first digit = **row** (Motors A/B), second digit = **column** (Motor C).

- Example: `03` → move to Row 0, Column 3.
- Motors A/B move via closed-loop absolute position commands.
- Motor C moves via time-based velocity jog (duration computed from step difference and calibrated range).

### Auto Stepping (`A`)

Performs a snake/zigzag sweep across the entire grid:

```
Row 1:  C5 ← C4 ← C3 ← C2 ← C1 ← C0    (backward sweep)
Row 0:  C0 → C1 → C2 → C3 → C4 → C5    (forward sweep)
```

- Supports pause/resume: pressing `X` saves current position.
- Pressing `A` again resumes from where it stopped.
- Any other command (`C`, `H`, `RC`) resets the auto sequence.

## LED Signaling System

The LED indicator uses Motor C's digital output **SO1** configured as **CMD_OK** (PA4.11 = 32):

| State | CMD_OK | LED | How |
|:------|:------:|:---:|:----|
| Drive idle (no active command) | HIGH | **ON** | `quickStop()` → command register cleared |
| Command running (velocity jog) | LOW | **OFF** | `signalLedOff()` → 0 RPM velocity jog |
| Blink sequence | HIGH→LOW | ON→OFF | `blinkLed()` → ON for duration, then OFF |

> **Design Note:** `signalLedOff()` starts a 0 RPM velocity jog to keep the drive in a "busy" state, forcing CMD_OK LOW. This prevents the LED from turning on unexpectedly during idle periods.

## Emergency Stop Behavior

| Mode | Motors A/B | Motor C | System State |
|:-----|:-----------|:--------|:-------------|
| **Calibration** | Stop immediately | Finishes current move | Aborted — must restart with `C` |
| **Homing** | Stop immediately | Finishes current move | Aborted — must restart with `H` |
| **Manual Position** | Stop immediately | Finishes column move | Remains calibrated |
| **Auto Stepping** | Stop immediately | Finishes column move | Saves position; `A` resumes |
| **Idle** | Stop immediately | No effect | No change |

> Motor C always completes its current move because it has no encoder — stopping mid-move would lose track of its position.

---

## HMI Web Interface (HMI/)

A browser-based control panel connecting to the Arduino via the **Web Serial API** (Chrome/Edge only).

https://github.com/user-attachments/assets/815b3fdb-c31c-4e8e-97d4-50450c9b956b

### Features

| Feature | Description |
|:--------|:------------|
| **Serial Connection** | Connect/disconnect to Arduino at 38400 baud |
| **Command Buttons** | Calibrate & Home, Home, Auto, Emergency Stop |
| **Dynamic Position Grid** | Configurable rows × columns grid; click any R*x*-C*y* button to send position command |
| **LED Signal Toggle** | Enable/disable the SO1 LED blink feature |
| **Transmission Log** | Live feed of all TX (sent) and RX (received) serial messages |
| **Camera Feed** | Streams live video from a connected webcam |
| **Video Recording** | Record camera feed to `.webm` files with timestamped filenames |

https://github.com/user-attachments/assets/2300ad33-0bbf-4218-a0a2-44df9f3044bd

**LED ON/OFF** — Nozzle simulated via LED signaling:

https://github.com/user-attachments/assets/69bd8a09-ef32-48e5-af23-948bd1f90b90

> **Tip:** Set your browser's default download directory to a `recordings/` folder for organized video storage.

> **⚠ Warning:** Opening the Arduino Serial Monitor while the HMI is connected (or vice versa) will reset the Arduino. Use one interface at a time.

---
