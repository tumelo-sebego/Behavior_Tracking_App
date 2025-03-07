from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from datetime import datetime, timedelta

progress_bp = Blueprint("progress", __name__)

@progress_bp.route("/daily", methods=["GET"])
@jwt_required()
def get_daily_progress():
    user_email = get_jwt_identity()
    today = datetime.combine(datetime.utcnow().date(), datetime.min.time())

    tasks = list(mongo.db.tasks.find({"user_email": user_email, "date": {"$gte": today}}))

    if not tasks:
        return jsonify({"progress": 0, "message": "No tasks for today"}), 200

    total_points = sum(task["points"] for task in tasks)
    completed_points = sum(task["points"] for task in tasks if task["completed"])

    progress = (completed_points / total_points) * 100 if total_points > 0 else 0

    return jsonify({"progress": progress, "total_points": total_points}), 200

@progress_bp.route("/weekly", methods=["GET"])
@jwt_required()
def get_weekly_progress():
    user_email = get_jwt_identity()
    seven_days_ago = datetime.combine(datetime.utcnow().date() - timedelta(days=7), datetime.min.time())

    # Fetch tasks from the past 7 days
    tasks = list(mongo.db.tasks.find({"user_email": user_email, "date": {"$gte": seven_days_ago}}))

    total_points = sum(task["points"] for task in tasks)
    completed_points = sum(task["points"] for task in tasks if task["completed"])

    progress = (completed_points / total_points) * 100 if total_points > 0 else 0

    return jsonify({"progress": progress, "total_points": total_points}), 200

