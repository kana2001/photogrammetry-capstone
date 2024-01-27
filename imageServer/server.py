import shutil
import socket
import struct
import os

def receive_files(port=12345):
    save_directory="received_images"
     # Create the directory if it doesn't exist
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)
    else:
        shutil.rmtree(save_directory)
        os.makedirs(save_directory)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind(('0.0.0.0', port))
        server_socket.listen()

        print(f"Server listening on port {port}")
        connection, address = server_socket.accept()

        with connection:
            print(f"Connection from {address}")
            while True:
                # Receive the length of the filename
                raw = connection.recv(4)
                if not raw:
                    break
                filename_length = struct.unpack(">I", raw)[0]

                # Receive the filename
                filename_bytes = connection.recv(filename_length)
                filename = filename_bytes.decode()

                # Receive the filesize
                filesize = struct.unpack(">Q", connection.recv(8))[0]

                # Construct the full path to save the file
                full_path = os.path.join(save_directory, filename)

                # Receive and save the file
                with open(full_path, 'wb') as file:
                    remaining = filesize
                    while remaining:
                        data = connection.recv(min(1024, remaining))
                        if not data:
                            break
                        file.write(data)
                        remaining -= len(data)

                print(f"{filename} received successfully in {save_directory}")

        print("All files received successfully")

# Example usage
# receive_files()
