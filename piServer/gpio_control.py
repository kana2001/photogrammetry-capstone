import RPi.GPIO as GPIO
import time
import sys
import serial

# Set the GPIO pin number you want to control
motor_gpio_pin = 17  
slider_gpio_pin = 27
tilt_gpio_pin = 22

pins = [motor_gpio_pin, slider_gpio_pin, tilt_gpio_pin] 
# Open a connection to the Arduino
arduino_camera = serial.Serial('/dev/ttyACM2', 9600)  # Replace '/dev/ttyACM1' with the correct port for your Arduino
arduino_turntable = serial.Serial('/dev/ttyACM3', 9600)


# Function to turn the GPIO pin on
def turn_on():
    GPIO.output(motor_gpio_pin, GPIO.HIGH)
    time.sleep(0.5)
# Function to turn the GPIO pin off
def turn_off():
    GPIO.output(motor_gpio_pin, GPIO.LOW)
    time.sleep(0.5)

def moveMotorOLD():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        GPIO.output(motor_gpio_pin, GPIO.HIGH)
        time.sleep(2)  # Wait for 2 seconds
        GPIO.output(motor_gpio_pin, GPIO.LOW)

def moveMotor():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        arduino_turntable.write(b'8')  # Send the signal '1' to Arduino
        
        response = arduino_turntable.readline().strip()  # Read the response from Arduino and remove any whitespace characters

        # Check if the response indicates the Arduino is done
        if response == b'Done':
            print("Arduino has completed its task.")

def moveSlider():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        GPIO.output(slider_gpio_pin, GPIO.HIGH)
        time.sleep(2)  # Wait for 0.5 seconds
        GPIO.output(slider_gpio_pin, GPIO.LOW)

def moveTiltOld():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        GPIO.output(tilt_gpio_pin, GPIO.HIGH)
        time.sleep(1)  # Wait for 0.5 seconds
        GPIO.output(tilt_gpio_pin, GPIO.LOW)

def moveTilt():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        arduino_camera.write(b'1')  # Send the signal '1' to Arduino

        time.sleep(1)  # Wait for 0.5 seconds
        # Read response from Arduino
        response = arduino_camera.readline().strip()  # Read the response from Arduino and remove any whitespace characters

        # Check if the response indicates the Arduino is done
        if response == b'Done':
            print("Arduino has completed its task.")
        else:
            print(response)
            print("Not recieved")
        

def moveTilt2():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        arduino_camera.write(b'2')  # Send the signal '1' to Arduino

        time.sleep(1)  # Wait for 0.5 seconds
                # Read response from Arduino
        response = arduino_camera.readline().strip()  # Read the response from Arduino and remove any whitespace characters

        # Check if the response indicates the Arduino is done
        if response == b'Done':
            print("Arduino has completed its task.")
        else:
            print(response)
            print("Not recieved")
        

def moveTilt3():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        arduino_camera.write(b'3')  # Send the signal '1' to Arduino

        time.sleep(1)  # Wait for 0.5 seconds
        # Read response from Arduino
        response = arduino_camera.readline().strip()  # Read the response from Arduino and remove any whitespace characters

        # Check if the response indicates the Arduino is done
        if response == b'Done':
            print("Arduino has completed its task.")
        else:
            print(response)
            print("Not recieved")

def resetTilt():
        # Trigger the Arduino by setting the GPIO pin high for a moment
        arduino_camera.write(b'4')  # Send the signal '1' to Arduino
            # Read response from Arduino
        response = arduino_camera.readline().strip()  # Read the response from Arduino and remove any whitespace characters

        # Check if the response indicates the Arduino is done
        if response == b'Done':
            print("Arduino has completed its task.")

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
    elif action == "moveSlider":
        moveSlider()
        print("moved Slider!")
    else:
        print("Invalid command. Usage: python gpio_control.py <on|off>")

    GPIO.cleanup()