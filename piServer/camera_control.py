import socket
import time
# from picamera import PiCamera

# def take_picture(file_path):
#     camera = PiCamera()
#     camera.resolution = (1024, 768)  # Adjust resolution as needed
#     time.sleep(2)  # Allow the camera to warm up
#     camera.capture(file_path)
#     camera.close()

def send_file(source_path, server_address, port=12345):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        client_socket.connect((server_address, port))

        with open(source_path, 'rb') as file:
            print(f"Connected to server at {server_address}")
            while True:
                data = file.read(1024)
                if not data:
                    break
                client_socket.sendall(data)

        print("File sent successfully")

# # Example usage on Raspberry Pi
# source_file = "../focus_stacking/output.jpg"  # Specify the path for the captured image on the Raspberry Pi
# server_address = "192.168.2.54"  # Replace with the IP address or hostname of your Windows machine

# # # Take a picture with the Raspberry Pi camera
# # take_picture(source_file)

# # Send the captured image to the Windows machine
# send_file(source_file, server_address)