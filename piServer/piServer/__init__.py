import os

import requests

from flask import Flask, Response, jsonify, request
from flask_cors import CORS
# from gpio_control import turn_on, turn_off, moveMotor
import subprocess
import send_images
from camera_control import CameraSingleton, capture_image_async, genFrames, setAutoFocus, setManualFocus
from libcamera import controls

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'piServer.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Allow all origins in development. You should restrict this in production.
    CORS(app)

    @app.route('/')
    def test():
        return 'test'

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/getScannedModels')
    def getScannedModels():
        data = [{
            "title": "ARWProcessDyno",
            "url": "https://sketchfab.com/models/57426b0a8253495a81cdb36550cd859f/embed?autostart=1&preload=1&api_version=1.0.0",
        },
            {
            "title": "A super Bob model",
            "url": "https://sketchfab.com/models/07a74f2302f9478f8986f13f86353ac6/embed?autostart=1&preload=1&api_version=1.0.0",
        }]
        return jsonify(data)

    @app.route('/moveMotor')
    def moveMotor():
        subprocess.run(['sudo', 'python', 'gpio_control.py', 'moveMotor'])
        return "Moved Motor"

    @app.route('/turnOn')
    def turnOn():
        subprocess.run(['sudo', 'python', 'gpio_control.py', 'on'])
        return "Turned On"

    @app.route('/turnOff')
    def turnOff():
        subprocess.run(['sudo', 'python', 'gpio_control.py', 'off'])
        return "Turned Off"

    @app.route('/sendImages')
    def sendImages():
        ip_address = request.args.get('ip')
        dirname = "capturedImages"
        if ip_address:
            requests.get(f"http://{ip_address}:5050/openSocketConnection")
            send_images.send_files(dirname, ip_address)
            return "Sent Images to IP: " + ip_address
        else:
            return "IP address missing in the query parameter."

    @app.route('/video_feed')
    def video_feed():
        return Response(genFrames(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')

    @app.route('/capture_image')
    def capture_image_route():
        camera = CameraSingleton.get_instance()
        capture_image_async(camera)
        return "Image capture initiated"
    
    @app.route('/setManualFocus')
    def manualFocusRoute():
        lensPosition = request.args.get('lensPosition')
        setManualFocus(float(lensPosition))
        return f"set lensPosition to ${lensPosition}"
    
    @app.route('/setAutoFocus')
    def setAutoFocusRoute():
        setAutoFocus()
        return "set camera to AutoFocus"
    

    return app

# if __name__ == "__main__":
#     # Change the host and port here
#     app = create_app()
#     app.run(host='0.0.0.0', port=5000)