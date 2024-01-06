import socket
import time
import os
import struct
# from picamera import PiCamera

# def take_picture(file_path):
#     camera = PiCamera()
#     camera.resolution = (1024, 768)  # Adjust resolution as needed
#     time.sleep(2)  # Allow the camera to warm up
#     camera.capture(file_path)
#     camera.close()

def send_files(directory, server_address, port=12345):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        client_socket.connect((server_address, port))
        print(f"Connected to server at {server_address}")

        for filename in os.listdir(directory):
            if filename.endswith((".jpg", ".jpeg", ".png")):  # Add other image formats if needed
                filepath = os.path.join(directory, filename)
                filesize = os.path.getsize(filepath)

                # Send the length of the filename, then the filename, and then the filesize
                filename_bytes = filename.encode()
                client_socket.sendall(struct.pack(">I", len(filename_bytes)))  # Filename length
                client_socket.sendall(filename_bytes)  # Filename
                client_socket.sendall(struct.pack(">Q", filesize))  # Filesize

                # Send file data
                with open(filepath, 'rb') as file:
                    while True:
                        data = file.read(1024)
                        if not data:
                            break
                        client_socket.sendall(data)

                print(f"{filename} sent successfully")

        print("All files sent successfully")

# # Example usage on Raspberry Pi
# source_file = "../focus_stacking/output.jpg"  # Specify the path for the captured image on the Raspberry Pi
# server_address = "192.168.2.54"  # Replace with the IP address or hostname of your Windows machine

# # # Take a picture with the Raspberry Pi camera
# # take_picture(source_file)

# # Send the captured image to the Windows machine
# send_file(source_file, server_address)