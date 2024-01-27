import os
from threading import Thread
from flask import Flask, request, send_from_directory, abort, jsonify
from flask_cors import CORS
import subprocess
import sqlite3
# from imageServer.imageServerFlask.dbActions import get_model_file
from .dbActions import get_all_models_name, get_model_file

import server

script_path = './runPhotogrammetry.sh'

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
        return 'this is the image server'

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'
    
    def handle_receive_files():
        server.receive_files()
        # Run photogrametry on recieved images
        try:
            print('Starting HelloPhotogrammetry...')
            output = subprocess.run([script_path], check=True, text=True, capture_output=True)
            print("Shell Script Output:")
            print(output.stdout)
        except subprocess.CalledProcessError as e:
            print("Shell Script Error:")
            print(e.output)

    @app.route('/openSocketConnection')
    def uploadImages():
        thread = Thread(target=handle_receive_files)
        thread.start()
        return 'Socket opened succesfully'
    
    @app.route('/model/<string:model_name>/<file_type>')
    def get_model_file_route(model_name, file_type):
        return get_model_file(model_name, file_type)
    
    @app.route('/models')
    def models_route():
        model_details = get_all_models_name()
        return jsonify(model_details)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5050)