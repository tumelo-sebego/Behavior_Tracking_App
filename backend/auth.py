from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from database import mongo

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    user = mongo.db.users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 404

    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token}), 200
