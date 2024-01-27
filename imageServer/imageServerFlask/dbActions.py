import sqlite3
from flask import Flask, send_from_directory, abort, url_for
import os


dbName = 'ImageServerFlask/ImageServerDatabase.db'
BASE_DIR = 'ImageServerFlask/models'

def create_model_table():
    # Connect to the database (it will be created if it doesn't exist)
    conn = sqlite3.connect(dbName)

    # Create a cursor object using the cursor() method
    cursor = conn.cursor()

    # Create table
    cursor.execute('''
    CREATE TABLE models (
        name TEXT PRIMARY KEY UNIQUE,
        glb_path TEXT,
        usdz_path TEXT,
        jpg_path TEXT,
        scanComplete BOOLEAN NOT NULL DEFAULT 0
    )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

# Function to insert data
def insert_model(name, glb_path, usdz_path, jpg_path, scanComplete):
    conn = sqlite3.connect(dbName)
    cursor = conn.cursor()
    
    cursor.execute('''
    INSERT INTO models (name, glb_path, usdz_path, jpg_path, scanComplete) 
    VALUES (?, ?, ?, ?, ?)
    ''', (name, glb_path, usdz_path, jpg_path, scanComplete))

    conn.commit()
    conn.close()

def get_model_file(model_name, file_type):
    # Validate file type
    if file_type not in ['glb', 'usdz', 'jpg']:
        abort(404)  # Not Found

    try:
        # Connect to SQLite database
        conn = sqlite3.connect(dbName)
        cursor = conn.cursor()
        # Fetch file path
        cursor.execute(f'SELECT {file_type}_path FROM models WHERE name=?', (model_name,))
        result = cursor.fetchone()

        if result and result[0]:
            file_path = os.path.join(BASE_DIR, result[0])
            print(file_path)
            if os.path.exists(file_path):
                dir_name = os.path.join('..',os.path.dirname(file_path))
                file_name = os.path.basename(file_path)
                return send_from_directory(dir_name, file_name)
            else:
                abort(404)  # File not found
        else:
            abort(404)  # Model or path not found
    except Exception as e:
        print(e)  # Log the error
        abort(500)  # Internal Server Error
    finally:
        conn.close()

def get_all_models_name():
    try:
        # Connect to SQLite database
        with sqlite3.connect(dbName) as conn:
            cursor = conn.cursor()
            cursor.execute(f'SELECT name, scanComplete FROM models')
            models = cursor.fetchall()

            # covert the result to a list of dictionaries
            model_details = [{'name': row[0], 'scanComplete': bool(row[1])} for row in models]
            return model_details
    except Exception as e:
        print(e)
        abort(500)  # Internal Server Error

def get_all_models():
    try:
        with sqlite3.connect(dbName) as conn:
            cursor = conn.cursor()

            # Adjust the query to fetch name, scan status, and jpg path for all models
            cursor.execute('SELECT name, scanComplete, jpg_path, glb_path, usdz_path FROM models')
            models = cursor.fetchall()

            # Convert the results into a list of dictionaries
            model_details = [
                {
                    'name': row[0],
                    'scanComplete': bool(row[1]),
                    'jpg_url': url_for('get_model_file_route', model_name=row[0], file_type='jpg', _external=True) if row[2] else None,
                    'glb_path': url_for('get_model_file_route', model_name=row[0], file_type='glb', _external=True) if row[3] else None,
                    'usdz_path': url_for('get_model_file_route', model_name=row[0], file_type='usdz', _external=True) if row[4] else None
                }
                for row in models
            ]
            return model_details
    except Exception as e:
        print(e)  #
        abort(500)  # Internal Server Error

def check_unique_model_name(modelName):
    try:
        with sqlite3.connect(dbName) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM models WHERE name=?", (modelName,))
            result = cursor.fetchone()

            if result is not None:
                # print('notunqiue')
                return False
            else:
                # print('unique')
                return True
    except Exception as e:
        print(e)  

# Example usage
# create_model_table()
# insert_model('Model2', 'glb/example3.glb', 'usdz/example3.usdz', 'jpg/example3.jpg', 1)
# check_unique_model_name("Model3")
