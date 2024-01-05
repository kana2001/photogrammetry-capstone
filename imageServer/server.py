import socket

def receive_file(destination_path, port=12345):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind(('0.0.0.0', port))
        server_socket.listen()

        print(f"Server listening on port {port}")
        connection, address = server_socket.accept()

        with connection, open(destination_path, 'wb') as file:
            print(f"Connection from {address}")
            while True:
                data = connection.recv(1024)
                if not data:
                    break
                file.write(data)

        print(f"File received successfully at {destination_path}")

# Example usage on Windows
destination_file = "PictureSample.jpg"  # Replace with the desired path on the Windows machine
receive_file(destination_file)