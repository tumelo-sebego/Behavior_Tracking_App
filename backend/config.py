import os
from datetime import timedelta
from dotenv import load_dotenv


load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    MONGO_URI = os.getenv("MONGO_URI")

     # 🔑 JWT Configuration
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)  # Access tokens expire in 7 days
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)  # Refresh tokens expire in 30 days

    # Debug mode
    DEBUG = True

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

# Environment selection
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
