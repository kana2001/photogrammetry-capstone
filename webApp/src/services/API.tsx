const apiPrefix = "http://127.0.0.1:5000"

// Function to make a GET request to /turnOn route
export async function turnOn(): Promise<string> {
    try {
        const response = await fetch(`${apiPrefix}/turnOn`);
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
        const response = await fetch(`${apiPrefix}/turnOff`);
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
        const response = await fetch(`${apiPrefix}/moveMotor`);
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

// Function to make a GET request to /sendImages route with an IP address query parameter
export async function sendImages(ipAddress: string): Promise<string> {
    try {
        const url = `${apiPrefix}/sendImages?ip=${ipAddress}`;
        const response = await fetch(url);

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

// Function to make a GET request to /captureImage route
export async function captureImage(): Promise<string> {
    try {
        const url = `${apiPrefix}/capture_image`;
        const response = await fetch(url);

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

// Function to make a GET request to /setManualFocus route
export async function setManualFocus(lensPosition: string): Promise<string> {
    try {
        const url = `${apiPrefix}/setManualFocus?lensPosition=${lensPosition}`;
        const response = await fetch(url);

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

// Function to make a GET request to /setAutoFocus route
export async function setAutoFocus(): Promise<string> {
    try {
        const url = `${apiPrefix}/setAutoFocus?`;
        const response = await fetch(url);

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

// Function to make a GET request to /captureImage route
export async function autoRoute(): Promise<string> {
    try {
        const url = `${apiPrefix}/autoRoute`;
        const response = await fetch(url);

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