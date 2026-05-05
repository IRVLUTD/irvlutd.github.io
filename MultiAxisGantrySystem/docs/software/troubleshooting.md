# Troubleshooting



| Symptom | Likely Cause | Resolution |
|:--------|:-------------|:-----------|
| No serial response from driver | Wrong baud rate or wiring | Verify RS485 A/B polarity; check `RS485_BAUDRATE = 38400` |
| Homing never completes | Limit switch not configured | Set SI7/SI8 in Motion Studio I/O settings |
| Motor C drifts after stopping | Open-loop position error | Re-calibrate with `C`; check `MOTOR_C_PULSES_PER_REV` |
| LED stays ON after homing | CMD_OK goes HIGH on idle | Add `signalLedOff()` after homing sequence |
| LED doesn't turn OFF at limits | Drive faults block `signalLedOff()` | Call `clearFault()` before `signalLedOff()` |
| Lock Shaft Alarm on Motor C | PA5.03 too low | Set PA5.03 ≥ 30 for ID 3 |
| HMI won't connect | Wrong browser | Use Chrome or Edge (Web Serial API required) |
| Arduino resets on HMI connect | Serial port conflict | Close Arduino Serial Monitor before using HMI |
| Auto-step resumes from wrong position | Motor C position lost | Re-home with `H` to re-z