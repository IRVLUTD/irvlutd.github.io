# Wiring

The wiring consists of 5 main stages:

1. Power Supply wiring
2. PC/Laptop interface communication with drivers via arduino
3. Drivers interconnection (daisy chaining)
4. Limit Switch wiring
5. Nozzle valve wiring

## Power Supply wiring

The power supply is connected to the drivers via banana cables. The power supply is rated for 24V and 10A. The power supply is connected to the drivers via banana cables.

![Power Supply Wiring](../images/power_supply_wiring.png)

## PC/Laptop interface communication with drivers via arduino

Arduino is connected to the Laptop/PC through a serial connection. It communicates with all three drivers through a single MAX485 RS485 transceiver module. The output from MAX485 module is connected to the RS485 A(+), B(-) terminals of the first driver. The other drivers are connected in daisy chain fashion. The arduino is powered by the USB port of the laptop. It can also be powered by an external power supply of 5V.

![Communication Connection](../images/overall_connection.png)

### Arduino Mega to MAX485 to Driver

| Arduino Mega Pin | MAX485 Pin | Description                       |
| :--------------- | :--------- | :-------------------------------- |
| **TX1** (Pin 18) | DI         | Transmit data                     |
| **RX1** (Pin 19) | RO         | Receive data                      |
| **Digital 2**    | DE + RE    | Direction control (tied together) |

| MAX485 Terminal | Driver Terminal | Description   |
| :-------------- | :-------------- | :------------ |
| **A (+)**       | RS485-A (+)     | Non-inverting |
| **B (−)**       | RS485-B (−)     | Inverting     |

![arduino to max485 to driver](../images/arduino_to_driver.png)

> ℹ️ If the communication with the driver is not established, interchange the A and B wires and try again.
