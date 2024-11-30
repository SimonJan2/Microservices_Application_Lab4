# backend/user_service/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = '/app/data/users.json'

def load_users():
    if not os.path.exists(DATA_FILE):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w') as f:
            json.dump({}, f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_users(users_data):
    with open(DATA_FILE, 'w') as f:
        json.dump(users_data, f)
    print(f"Saved users to file: {users_data}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"Received registration data: {data}")
        
        # Load current users
        users = load_users()
        print(f"Current users before registration: {users}")
        
        if data['username'] in users:
            print(f"Username {data['username']} already exists")
            return jsonify({"error": "Username already exists"}), 400
        
        # Add new user
        users[data['username']] = {
            "password": generate_password_hash(data['password']),
            "email": data['email']
        }
        
        # Save updated users
        save_users(users)
        print(f"Registration successful for {data['username']}")
        return jsonify({"message": "User registered successfully"}), 201
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(f"Login attempt for: {data['username']}")
        
        # Load current users
        users = load_users()
        print(f"Current users during login: {users}")
        
        user = users.get(data['username'])
        if user and check_password_hash(user['password'], data['password']):
            print(f"Login successful for {data['username']}")
            return jsonify({"message": "Login successful"}), 200
            
        print(f"Login failed for {data['username']}")
        return jsonify({"error": "Invalid credentials"}), 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/debug', methods=['GET'])
def debug():
    users = load_users()
    return jsonify({
        "users": users,
        "file_exists": os.path.exists(DATA_FILE),
        "file_content": users
    })

@app.route('/users', methods=['GET'])
def get_users():
    users = load_users()
    return jsonify(users)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)