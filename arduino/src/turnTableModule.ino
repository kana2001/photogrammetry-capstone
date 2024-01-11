//Arduino Stepper Library
#include <Stepper.h>

// Defines the number of steps per rotation
// 28BYJ-48 stepper motor has 32 steps per revolution with 64:1 gear reduction
// 64 * 32 = 2048
const int stepsPerRevolution = 2048;

// Connect motor shield pins IN1-IN3-IN2-IN4 to Arduino
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);

//For testing, push button was used
//const int buttonPin = 2;

//Input signal from Pi set to Rx pin
const int rxPin = 0;

void setup() {
  //push button set up for testing
  //pinMode(buttonPin, INPUT);
  pinMode(rxPin, INPUT);
  //Initialize serial communication with a baud rate of 9600
  Serial.begin(9600);
}


void loop() {
    if (digitalRead(rxPin) == HIGH) {
      
        // Rotate CW at 2 RPM
        myStepper.setSpeed(2);

        // Determine the number of steps for a 15-degree rotation 
        // 360 / 15 = 24
        int stepsFor15Degrees = stepsPerRevolution / 24;  // 2048 / 24 = 85.333 
        myStepper.step(stepsFor15Degrees);
    }
}




