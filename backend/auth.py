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

# User Registration
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400
    mongo.db.users.insert_one(data)
    return jsonify({"message": "User registered successfully"}), 201
