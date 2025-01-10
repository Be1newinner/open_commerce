from app.config import products_collections
from bson import ObjectId

class ProductModel:
    @staticmethod
    def get_by_id(product_id: str, projection: dict = None):
        """Fetch a product by its ID."""
        try:
            projection = projection or {}
            return products_collections.find_one({"_id": ObjectId(product_id)}, projection)
        except Exception as e:
            return None
    
    @staticmethod
    def get_by_sku(product_sku: str, projection: dict = None):
        """Fetch a product by its SKU."""
        projection = projection or {}
        return products_collections.find_one(
            {"sku": {"$regex": f"^{product_sku}$", "$options": "i"}},
            projection,
        )
    
    @staticmethod
    def get_all(filters: dict = {}, projection: dict = {}, limit: int = 5, page: int = 1):
        """Fetch all products with optional filters."""
        skip = limit * (page - 1)
        cursor = products_collections.find(filters, projection).limit(limit).skip(skip)
        return list(cursor)
    
    @staticmethod
    def insert(product_data: dict):
        """Insert a new product."""
        return products_collections.insert_one(product_data)
    
    @staticmethod
    def update(product_id: str, update_data: dict):
        """Update a product by its ID."""
        return products_collections.update_one(
            {"_id": ObjectId(product_id)}, {"$set": update_data}
        )
    
    @staticmethod
    def delete(product_id: str):
        """Delete a product by its ID."""
        result = products_collections.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count > 0:
            return {"success": True, "message": "Product deleted successfully"}
        else:
            return {"success": False, "message": "Product not found"}
    
    @staticmethod
    def bulk_insert(products: list[dict]):
        """Insert multiple products."""
        return products_collections.insert_many(products)

    @staticmethod
    def bulk_delete(product_ids: list[str]):
        """Delete multiple products by their IDs."""
        object_ids = [ObjectId(pid) for pid in product_ids]
        return products_collections.delete_many({"_id": {"$in": object_ids}})
