import socket
import time
import os
import struct

def send_files(directory, server_address, port=12345, retries=5, delay=2):
    for attempt in range(retries):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
                client_socket.connect((server_address, port))
                print(f"Connected to server at {server_address} on attempt {attempt + 1}")

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
                return  # Exit the function after successful connection and file transfer
        except socket.error as e:
            print(f"Connection attempt {attempt + 1} failed with error: {e}")
            time.sleep(delay)  # Wait before retrying
    print("Could not connect to the server after several attempts.")