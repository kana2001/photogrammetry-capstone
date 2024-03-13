import os
from threading import Thread
from flask import Flask, request, send_from_directory, abort, jsonify
from flask_cors import CORS
import subprocess
import sqlite3
import shutil
# from imageServer.imageServerFlask.dbActions import get_model_file
from .dbActions import check_unique_model_name, delete_model, get_all_models_name, get_all_models, get_model_file, insert_model

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

    # Dictionary to track the status of each model processing
    task_status = {}
    def handle_receive_files(model_name):
        server.receive_files()
        # Run photogrametry on recieved images
        try:
            print('Starting HelloPhotogrammetry...')
            output = subprocess.run(
                [script_path], check=True, text=True, capture_output=True)
            print("Shell Script Output:")
            print(output.stdout)
        except subprocess.CalledProcessError as e:
            print("Shell Script Error:")
            print(e.output)

        try:
            print('Converting usdz file to glb...')
            subprocess.run(['dotnet', 'run', '--project',
                           'usdzToGlb/usdzToGlb', 'received_images/model.usdz'])
        except subprocess.CalledProcessError as e:
            print("usdz To glb error:")
            print(e.output)

        shutil.copy('received_images/test.jpg',
                    f'imageServerFlask/models/jpg/{model_name}.jpg')
        shutil.copy('received_images/model.usdz',
                    f'imageServerFlask/models/usdz/{model_name}.usdz')
        shutil.copy('received_images/model.glb',
                    f'imageServerFlask/models/glb/{model_name}.glb')

        insert_model(model_name, f'glb/{model_name}.glb',
                     f'usdz/{model_name}.usdz', f'jpg/{model_name}.jpg', 1)
        task_status[model_name] = "completed"  # Update status upon completion
        print(f'added model {model_name} to db')

    @app.route('/deleteModel')
    def deleteModelRoute():
        model_name = request.args.get('modelName')
        if model_name:
            delete_model(model_name)
            return jsonify({"message": f"Model '{model_name}' deleted successfully."}), 200
        else:
            return jsonify({"error": "Model name not provided."}), 400

    @app.route('/openSocketConnection')
    def uploadImages():
        model_name = request.args.get('modelName')
        print(model_name)
        if (not check_unique_model_name(model_name)):
            print('Image Transfer failed: User did not enter a unique name.')
            response = {
                "success": False,
                "message": "User did not enter a unique model name"
            }
            return jsonify(response), 400
        task_status[model_name] = "processing"  # Mark as processing
        thread = Thread(target=handle_receive_files, args=(model_name,))
        thread.start()
        response = {
            "success": True,
            "message": "Socket opened successfully"
        }
        return jsonify(response)
    
    @app.route('/checkStatus')
    def checkStatus():
        model_name = request.args.get('modelName')
        status = task_status.get(model_name, "not found")
        return jsonify({"model_name": model_name, "status": status})

    @app.route('/model/<string:model_name>/<file_type>')
    def get_model_file_route(model_name, file_type):
        return get_model_file(model_name, file_type)

    @app.route('/models')
    def models_route():
        model_details = get_all_models()
        return jsonify(model_details)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5050)
