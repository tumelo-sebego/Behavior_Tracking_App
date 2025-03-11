from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from datetime import datetime, timedelta

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def add_task():
    user_email = get_jwt_identity()
    data = request.json
    today = datetime.combine(datetime.utcnow().date(), datetime.min.time())

    # Get today's tasks
    tasks = list(mongo.db.tasks.find({"user_email": user_email, "date": {"$gte": today}}))
    current_total = sum(task["points"] for task in tasks)

    new_task_points = data.get("points", 0)

    if current_total + new_task_points > 100:
        return jsonify({"message": "Total points cannot exceed 100. Adjust tasks accordingly."}), 400

    if current_total + new_task_points < 100:
        return jsonify({"message": "Total points must add up to 100. Add more tasks."}), 400

    data["user_email"] = user_email
    data["completed"] = False
    data["date"] = today
    mongo.db.tasks.insert_one(data)

    return jsonify({"message": "Task added successfully!"}), 201

# Get all tasks for the logged-in user
@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_email = get_jwt_identity()
    tasks = list(mongo.db.tasks.find({"user_email": user_email}, {"_id": 0}))
    return jsonify(tasks), 200

# Mark a task as completed
@tasks_bp.route("/tasks/<task_title>/complete", methods=["PATCH"])
@jwt_required()
def complete_task(task_title):
    user_email = get_jwt_identity()
    mongo.db.tasks.update_one(
        {"title": task_title, "user_email": user_email}, 
        {"$set": {"completed": True}}
    )
    return jsonify({"message": "Task marked as completed"}), 200
