import io
import threading
from picamera2 import Picamera2
from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from threading import Condition
from libcamera import controls
import os

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
    camera.set_controls({"AfMode": controls.AfModeEnum.Continuous})
    output = StreamingOutput()
    camera.start_recording(JpegEncoder(), FileOutput(output))
    while True:
        with output.condition:
            output.condition.wait()
            frame = output.frame
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
def increment_filename(filename, dirname):
    base, ext = os.path.splitext(filename)
    index = 1

    while os.path.exists(f"{dirname}/{filename}"):
        filename = f"{base}_{index}{ext}"
        index += 1

    return filename

def capture_image(camera: Picamera2):
    dirname = "capturedImages"
    filename = increment_filename("test.jpg", dirname)
    
    request = camera.capture_request()

    current_dir = os.getcwd()
    if not os.path.exists(dirname):
        os.mkdir(dirname)
    relative_path = os.path.join(current_dir, dirname, filename)
    
    request.save("main", relative_path)
    request.release()
    print("Still image captured!")

def capture_image_async(camera):
    thread = threading.Thread(target=capture_image, args=(camera,))
    thread.start()

def setManualFocus(lensPosition):
    camera = CameraSingleton.get_instance()
    camera.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": lensPosition})

def setAutoFocus():
    camera = CameraSingleton.get_instance()
    camera.set_controls({"AfMode": controls.AfModeEnum.Continuous})