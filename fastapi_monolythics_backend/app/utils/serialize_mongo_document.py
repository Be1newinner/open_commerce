def serialize_mongo_document(document):
    """Helper function to convert MongoDB document for JSON serialization."""
    document["_id"] = str(document["_id"])
    return document