# Server

## Dependencies

Requires Python3, and .NET 8.0 to be installed

## Developer Setup

### Create a virtual environment

    python3 -m venv .venv

### Activate the environment

#### mac/linux

    . .venv/bin/activate

#### windows (git bash)

    . .venv/Scripts/activate

### Start backend in debug mode

    flask --app imageServerFlask run --host=0.0.0.0 --port=5050 --debug

### saving dependencies

    pip freeze > requirements.txt

### installing dependencies

    pip install -r requirements.txt
