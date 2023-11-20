#!/usr/bin/python3

"""Sample script for uploading to Sketchfab using the V3 API and the requests library."""

import json
from time import sleep

# import the requests library
# http://docs.python-requests.org/en/latest
# pip install requests
import requests
from requests.exceptions import RequestException

##
# Uploading a model to Sketchfab is a two step process
#
# 1. Upload a model. If the upload is successful, the API will return
#    the model's uid in the `Location` header, and the model will be placed in the processing queue
#
# 2. Poll for the processing status
#    You can use your model id (see 1.) to poll the model processing status
#    The processing status can be one of the following:
#    - PENDING: the model is in the processing queue
#    - PROCESSING: the model is being processed
#    - SUCCESSED: the model has being sucessfully processed and can be view on sketchfab.com
#    - FAILED: the processing has failed. An error message detailing the reason for the failure
#              will be returned with the response
#
# HINTS
# - limit the rate at which you poll for the status (once every few seconds is more than enough)
##

SKETCHFAB_API_URL = 'https://api.sketchfab.com/v3'
#YOUR API_TOKEN from https://sketchfab.com/settings/password
API_TOKEN = 'ed56be828f484b2e98b0162ad2d01699' #This is Juan API
MAX_RETRIES = 50
MAX_ERRORS = 10
RETRY_TIMEOUT = 5  # seconds


def _get_request_payload(*, data=None, files=None, json_payload=False):
    """Helper method that returns the authentication token and proper content type depending on
    whether or not we use JSON payload."""
    data = data or {}
    files = files or {}
    headers = {'Authorization': f'Token {API_TOKEN}'}

    if json_payload:
        headers.update({'Content-Type': 'application/json'})
        data = json.dumps(data)

    return {'data': data, 'files': files, 'headers': headers}


def upload():
    """
    POST a model to sketchfab.
    This endpoint only accepts formData as we upload a file.
    """
    model_endpoint = f'{SKETCHFAB_API_URL}/models'

    # Mandatory parameters
    model_file = '/Users/juanrojas/Downloads/Insect.zip'  # path to your model

    # Optional parameters
    data = {
        'name': 'A Bob model',
        'description': 'This is a bob model I made with love and passion',
        'tags': ['bob', 'character', 'video-games'],  # Array of tags,
        'categories': ['people'],  # Array of categories slugs,
        'license': 'by',  # License slug,
        'private': 0,  # 0 no password, 1 password requires a pro account, #'password': 'my-password',  # requires a pro account,
        'isPublished': False,  # Model will be on draft instead of published,
        'isInspectable': True,  # Allow 2D view in model inspector
    }

    print('Uploading...')

    with open(model_file, 'rb') as file_:
        files = {'modelFile': file_}
        payload = _get_request_payload(data=data, files=files)

        try:
            response = requests.post(model_endpoint, **payload)
        except RequestException as exc:
            print(f'An error occured: {exc}')
            return

    if response.status_code != requests.codes.created:
        print(f'Upload failed with error: {response.json()}')
        return None

    # Should be https://api.sketchfab.com/v3/models/XXXX
    model_url = response.headers['Location']
    print('Upload successful. Your model is being processed.')
    print(f'Once the processing is done, the model will be available at: {model_url}')

    return model_url


def poll_processing_status(model_url):
    """GET the model endpoint to check the processing status."""
    errors = 0
    retry = 0

    print('Start polling processing status for model')

    while (retry < MAX_RETRIES) and (errors < MAX_ERRORS):
        print(f'Try polling processing status (attempt #{retry})...')

        payload = _get_request_payload()

        try:
            response = requests.get(model_url, **payload)
        except RequestException as exc:
            print(f'Try failed with error {exc}')
            errors += 1
            retry += 1
            continue

        result = response.json()

        if response.status_code != requests.codes.ok:
            print(f'Upload failed with error: {result["error"]}')
            errors += 1
            retry += 1
            continue

        processing_status = result['status']['processing']

        if processing_status == 'PENDING':
            print(f'Your model is in the processing queue. Will retry in {RETRY_TIMEOUT} seconds')
            retry += 1
            sleep(RETRY_TIMEOUT)
            continue
        elif processing_status == 'PROCESSING':
            print(f'Your model is still being processed. Will retry in {RETRY_TIMEOUT} seconds')
            retry += 1
            sleep(RETRY_TIMEOUT)
            continue
        elif processing_status == 'FAILED':
            print(f'Processing failed: {result["error"]}')
            return False
        elif processing_status == 'SUCCEEDED':
            print(f'Processing successful. Check your model here: {model_url}')
            return True

        retry += 1

    print('Stopped polling after too many retries or too many errors')
    return False


def patch_model(model_url):
    """
    PATCH the model endpoint to update its name, description...
    Important: The call uses a JSON payload.
    """

    payload = _get_request_payload(data={'name': 'A super Bob model'}, json_payload=True)

    try:
        response = requests.patch(model_url, **payload)
    except RequestException as exc:
        print(f'An error occured: {exc}')
    else:
        if response.status_code == requests.codes.no_content:
            print('PATCH model successful.')
        else:
            print(f'PATCH model failed with error: {response.content}')


def patch_model_options(model_url):
    """PATCH the model options endpoint to update the model background, shading, orienration."""
    data = {
        'shading': 'shadeless',
        'background': '{"color": "#FFFFFF"}',
        # For axis/angle rotation:
        'orientation': '{"axis": [1, 1, 0], "angle": 34}',
        # Or for 4x4 matrix rotation:
        # 'orientation': '{"matrix": [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]}'
    }
    payload = _get_request_payload(data=data, json_payload=True)
    try:
        response = requests.patch(f'{model_url}/options', **payload)
    except RequestException as exc:
        print(f'An error occured: {exc}')
    else:
        if response.status_code == requests.codes.no_content:
            print('PATCH options successful.')
        else:
            print(f'PATCH options failed with error: {response.content}')

def make_model_public(model_url):
    """PATCH the model endpoint to make the model public."""
    data = {'isPublished': True}
    payload = _get_request_payload(data=data, json_payload=True)
    try:
        response = requests.patch(model_url, **payload)
    except RequestException as exc:
        print(f'An error occurred: {exc}')
    else:
        if response.status_code == requests.codes.no_content:
            print('Model made public successfully.')
        else:
            print(f'Making model public failed with error: {response.content}')

def get_model_url(model_uid):
    """
    GET the model endpoint to retrieve the model URL.
    """
    model_endpoint = f'{SKETCHFAB_API_URL}/models/{model_uid}'
    payload = _get_request_payload()

    try:
        response = requests.get(model_endpoint, **payload)
    except RequestException as exc:
        print(f'An error occurred: {exc}')
        return None

    if response.status_code != requests.codes.ok:
        print(f'Failed to get model URL with error: {response.json()}')
        return None

    model_url = response.json().get('viewerUrl')
    if model_url:
        print(f'Model URL: {model_url}')
        return model_url
    else:
        print('Model URL not found in the response.')
        return None



###################################
# Uploads, polls and patch a model
###################################

if __name__ == '__main__':
    if model_url := upload():
        if poll_processing_status(model_url):
            patch_model(model_url)
            patch_model_options(model_url)
            make_model_public(model_url)

            # Get and print the model URL
            model_uid = model_url.split('/')[-1]
            get_model_url(model_uid)

