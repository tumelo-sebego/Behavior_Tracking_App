from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/behavior_tracker"
mongo = PyMongo(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400
    mongo.db.users.insert_one(data)
    return jsonify({"message": "User registered successfully"}), 201

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"email": data["email"]})
    if not user:
        return jsonify({"message": "User not found"}), 401
    token = create_access_token(identity=data["email"])
    return jsonify({"token": token}), 200


# Create a new task
@app.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():
    user_email = get_jwt_identity()
    data = request.json
    task = {
        "title": data["title"],
        "points": data["points"],
        "completed": False,
        "date": datetime.utcnow(),
        "user_email": user_email
    }
    mongo.db.tasks.insert_one(task)
    return jsonify({"message": "Task added successfully"}), 201

# Get all tasks for the logged-in user
@app.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    user_email = get_jwt_identity()
    tasks = list(mongo.db.tasks.find({"user_email": user_email}, {"_id": 0}))
    return jsonify(tasks), 200

# Mark a task as completed
@app.route("/tasks/<task_title>/complete", methods=["PATCH"])
@jwt_required()
def complete_task(task_title):
    user_email = get_jwt_identity()
    mongo.db.tasks.update_one(
        {"title": task_title, "user_email": user_email}, 
        {"$set": {"completed": True}}
    )
    return jsonify({"message": "Task marked as completed"}), 200

if __name__ == "__main__":
    app.run(debug=True)
