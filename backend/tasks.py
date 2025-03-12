from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from datetime import datetime, timedelta

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def add_tasks():
    user_email = get_jwt_identity()
    data = request.json  # Expecting an array of tasks
    today = datetime.combine(datetime.utcnow().date(), datetime.min.time())

    # Ensure data is a list
    if not isinstance(data, list):
        return jsonify({"message": "Invalid input format. Expected a list of tasks."}), 400
    
    new_tasks = data  # Expecting {"tasks": [{title, points}, {title, points}]}
    new_tasks_total = sum(task["points"] for task in new_tasks)

    # Validate total points
    if new_tasks_total > 100:
        return jsonify({
            "message": "Total points cannot exceed 100. Adjust tasks accordingly.",
            "points from frontend": new_tasks_total,
        }), 400

    if new_tasks_total < 100:
        return jsonify({
            "message": "Total points must add up to 100. Add more tasks.",
            "points from frontend": new_tasks_total,
        }), 400

    # Prepare tasks for insertion
    for task in new_tasks:
        task["user_email"] = user_email
        task["completed"] = False
        task["date"] = today

    mongo.db.tasks.insert_many(new_tasks)  # Insert all tasks at once

    return jsonify({"message": "Tasks added successfully!"}), 201


# Get all tasks for the logged-in user
@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_email = get_jwt_identity()
    tasks = list(mongo.db.tasks.find({"user_email": user_email}, {"_id": 0}))
    return jsonify(tasks), 200

# Mark a task as completed
@tasks_bp.route("/<task_title>/complete", methods=["PATCH"])
@jwt_required()
def complete_task(task_title):
    user_email = get_jwt_identity()
    task_title = unquote(task_title)  # Decode the URL-encoded title
    
    result = mongo.db.tasks.update_one(
        {"title": task_title, "user_email": user_email}, 
        {"$set": {"completed": True}}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Task not found"}), 404

    return jsonify({"message": "Task marked as completed"}), 200
