import os
from dotenv import load_dotenv, dotenv_values
import motor.motor_asyncio

load_dotenv(override=True)

MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
SERVER_DOMAIN = os.getenv("SERVER_DOMAIN")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

db = client[MONGO_DB_NAME]