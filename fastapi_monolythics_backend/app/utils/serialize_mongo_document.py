from app.models.product import productBase
from typing import List
from bson import ObjectId
from datetime import datetime

def serialize_mongo_document(document):
    """Helper function to convert MongoDB document for JSON serialization."""
    # isinstance(d, ObjectId):
    #     document["_id"] = str(document["_id"])
    try:
        for key, value in document.items():
            if isinstance(value, datetime):
                document[key] = str(value)
            if isinstance(value, ObjectId):
                document[key] = str(value)
            if isinstance(value, dict):
                new_val = serialize_mongo_document(value)
                document[key] = new_val
            if isinstance(value, list):
                new_val = serialize_mongo_collection(value)
                document[key] = new_val
        return document
    except Exception as e:
        print(e)
        return document

def serialize_mongo_collection(collection: List[any]):
    """Helper function to convert MongoDB document for JSON serialization."""
    return [serialize_mongo_document(data) for data in collection]