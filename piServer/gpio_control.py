import RPi.GPIO as GPIO
import time
import sys

# Set the GPIO pin number you want to control
gpio_pin = 17  # Change this to your desired GPIO pin number

# Initialize GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(gpio_pin, GPIO.OUT)
GPIO.output(gpio_pin, GPIO.LOW)  # Ensure the GPIO pin is initially set to LOW

# Function to turn the GPIO pin on
def turn_on():
    GPIO.output(gpio_pin, GPIO.HIGH)
    time.sleep(0.5)
# Function to turn the GPIO pin off
def turn_off():
    GPIO.output(gpio_pin, GPIO.LOW)
    time.sleep(0.5)

def moveMotor():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        GPIO.output(gpio_pin, GPIO.HIGH)
        time.sleep(0.5)  # Wait for 0.5 seconds
        GPIO.output(gpio_pin, GPIO.LOW)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python gpio_control.py <on|off>")
        sys.exit(1)

    action = sys.argv[1]

    if action == "on":
        turn_on()
        print("GPIO pin turned ON")
    elif action == "off":
        turn_off()
        print("GPIO pin turned OFF")
    elif action == "moveMotor":
        moveMotor()
        print("moved Motor!")
    else:
        print("Invalid command. Usage: python gpio_control.py <on|off>")

    GPIO.cleanup()