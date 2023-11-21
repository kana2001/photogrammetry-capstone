// #include <Serial.h>;

const int inputPin = 4;  // Replace with the actual GPIO pin number you are using
const int outputPin = 0;
int timer = 0; 
void setup() {
  pinMode(inputPin, INPUT);
  pinMode(outputPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int signal = digitalRead(inputPin);
  timer++;
  Serial.print(timer);
  Serial.println(signal);
  if (signal == HIGH) {
    // Signal received, execute your sequence of commands here
    // Example: Turn on an LED for a few seconds
    digitalWrite(outputPin, HIGH);
  }
  else {
    digitalWrite(outputPin, LOW);

  }
}
