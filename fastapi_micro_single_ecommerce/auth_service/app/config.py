from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv

load_dotenv(override=True)

client = MongoClient(getenv("MONOG_URL"))
db = client["ecommerce-single"]
user_collection = db["users"]