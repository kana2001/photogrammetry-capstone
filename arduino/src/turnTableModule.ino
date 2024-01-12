//Motor is coded to rotate 15 degrees when input from Pi goes LOW. 

//Arduino Stepper Library
#include <Stepper.h>

// Defines the number of steps per rotation
// 28BYJ-48 stepper motor has 32 steps per revolution with 64:1 gear reduction
// 64 * 32 = 2048
const int stepsPerRevolution = 2048;

// Flag to track whether the motor has turned or not
bool motorTurned = false;  

// Connect motor shield pins IN1-IN3-IN2-IN4 to Arduino
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);

//Input signal from Pi
const int rxPin = 2;

void setup() {
  pinMode(rxPin, INPUT_PULLUP);
}

void loop() {
    if (digitalRead(rxPin) == LOW && !motorTurned) {
      
        // Rotate CW at 2 RPM
        myStepper.setSpeed(2);

        // Determine the number of steps for a 15-degree rotation 
        // 360 / 15 = 24
        int stepsFor15Degrees = stepsPerRevolution / 24;
        myStepper.step(stepsFor15Degrees);
        motorTurned = true; 
    }
    
    // Reset the flag when the rxPin signal goes high
    else if (digitalRead(rxPin) == HIGH && motorTurned) {
    motorTurned = false;
    }

}