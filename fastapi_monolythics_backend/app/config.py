import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

db = client["ecommerce-backend"]