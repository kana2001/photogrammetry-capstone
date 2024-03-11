const apiPrefix = "http://100.92.5.20:5000"

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

// Function to make a GET request to /moveSlider route
export async function moveSlider(): Promise<string> {
    try {
        const response = await fetch(`${apiPrefix}/moveSlider`);
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

// Function to make a GET request to /moveTilt route
export async function moveTilt(): Promise<string> {
    try {
        const response = await fetch(`${apiPrefix}/moveTilt`);
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

// Function to make a GET request to /sendImages route with IP address and modelName query parameters
export async function sendImages(ipAddress: string, modelName:string): Promise<string> {
    try {
        const url = `${apiPrefix}/sendImages?ip=${ipAddress}&modelName=${modelName}`;
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
export async function captureImage(setShowShutter: React.Dispatch<React.SetStateAction<boolean>>): Promise<string> {
    try {
        const url = `${apiPrefix}/capture_image`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        setShowShutter(true);
        const shutter = new Audio('/shutter.wav');
        shutter.play();
        setTimeout(() => {
            setShowShutter(false);
        }, 50); // Replace 2000 with however many milliseconds you want
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

// Function to make a GET request to /fetchModels route
export async function fetchModels() {
    try {
        const url = `${apiPrefix}/models`
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}