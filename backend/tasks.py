from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["POST"])
@jwt_required()
def add_task():
    user_email = get_jwt_identity()
    data = request.json
    today = datetime.utcnow().date()

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
