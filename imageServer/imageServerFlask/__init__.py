import os
from flask import Flask, request
from flask_cors import CORS

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
    

    @app.route('/uploadImages')
    def uploadImages():
        return 'Images received successfully'
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5050)