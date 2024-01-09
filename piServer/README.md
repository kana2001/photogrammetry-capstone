# Server

## Developer Setup
### Create a virtual environment
    python3 -m venv --system-site-packages .venv

### Activate the environment
#### mac/linux
    . .venv/bin/activate

#### windows (git bash)
    . .venv/Scripts/activate

### Start backend in debug mode
    flask --app piServer run --debug

### saving dependencies
    pip freeze > requirements.txt

### installing dependencies
    pip install -r requirements.txt