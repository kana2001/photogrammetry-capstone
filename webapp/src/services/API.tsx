// Function to make a GET request to /turnOn route
export async function turnOn(): Promise<string> {
    try {
        const response = await fetch('http://localhost:5000/turnOn');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function to make a GET request to /turnOff route
export async function turnOff(): Promise<string> {
    try {
        const response = await fetch('http://localhost:5000/turnOff');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function to make a GET request to /moveMotor route
export async function moveMotor(): Promise<string> {
    try {
        const response = await fetch('http://localhost:5000/moveMotor');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
