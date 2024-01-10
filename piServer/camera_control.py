import io
import threading
from picamera2 import Picamera2
from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from threading import Condition

class CameraSingleton:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls._create_instance()
        return cls._instance

    @staticmethod
    def _create_instance():
        camera = Picamera2()
        # Add any necessary configuration for the camera here
        return camera

class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()

#defines the function that generates our frames
def genFrames():
    camera = CameraSingleton.get_instance()
    camera.stop_recording()
    camera.configure(camera.create_video_configuration(main={"size": (1920, 1080)}))
    output = StreamingOutput()
    camera.start_recording(JpegEncoder(), FileOutput(output))
    while True:
        with output.condition:
            output.condition.wait()
            frame = output.frame
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
def capture_image(camera: Picamera2):
    request = camera.capture_request()
    request.save("main", "test.jpg")
    request.release()
    print("Still image captured!")

def capture_image_async(camera):
    thread = threading.Thread(target=capture_image, args=(camera,))
    thread.start()