from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database import mongo
from auth import auth_bp
from tasks import tasks_bp
from progress import progress_bp
import reset  # Ensure the reset job runs on startup

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(tasks_bp, url_prefix="/tasks")
app.register_blueprint(progress_bp, url_prefix="/progress")

if __name__ == "__main__":
    app.run(debug=True)
    