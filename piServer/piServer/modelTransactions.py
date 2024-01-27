import requests
serverIP = '100.80.22.106:5050'

def get_models_from_imageServer():
    url = f"http://{serverIP}/models" 
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error making request to imageServer: {e}")
        return None