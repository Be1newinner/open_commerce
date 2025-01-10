from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv

load_dotenv(override=True)

client = MongoClient(getenv('MONGO_URI'))
db = client["ecommerce-single"]
products_collections = db["products"]