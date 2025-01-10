from pydantic import BaseModel
from app.config import products_collections
from app.utils import StandardSuccessResponse, StandardErrorResponse
from bson import ObjectId
from pymongo.errors import PyMongoError
from functools import wraps
from datetime import datetime

def handle_exceptions(func):
    """
    Decorator to handle exceptions and return a standardized error response.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except PyMongoError as e:
            return StandardErrorResponse(
                message=f"Database error: {str(e)}", status_code=500
            )
        except Exception as e:
            return StandardErrorResponse(
                message=f"Unexpected error: {str(e)}", status_code=500
            )
    return wrapper


class ProductServices(BaseModel):
    __all_products_projection: dict = {
        "_id": 1,
        "sku": 1,
        "name": 1,
        "price": 1,
        "discount_price": 1,
        "category_id": 1,
        "sub_category_id": 1,
        "stock": 1,
        "images": 1,
        "tags": 1,
        "rating": 1,
        "status": 1,
    }

    __detailed_product_projection: dict = {
        **__all_products_projection,
        "description": 1,
        "reviews": 1,
        "created_at": 1,
        "updated_at": 1,
        "variants": 1,
        "shipping_details": 1,
        "meta": 1,
    }

    def __serialize_product(self, product):
        """
        Serializes a single product document.
        """
        if not product:
            return None
        
        def to_iso(value):
            return value.isoformat() if isinstance(value, datetime) else None

        return {
        "_id": str(product.get("_id")),
        "category_id": str(product.get("category_id", "")),
        "sub_category_id": str(product.get("sub_category_id", "")),
        "created_at": to_iso(product.get("created_at")),
        "updated_at": to_iso(product.get("updated_at")),
            **{
                k: product.get(k)
                for k in product
                if k not in ["_id", "category_id", "sub_category_id", "created_at", "updated_at"]
            },
        }

    def __fetch_product(self, filter_query: dict, projection: dict):
        """
        Fetch a single product by filter query and projection.
        """
        product = products_collections.find_one(filter_query, projection)
        if product and "reviews" in product:
            product["reviews"] = [
                {**review, "reviewer_id": str(review.get("reviewer_id", ""))}
                for review in product.get("reviews", [])
            ]
        return product

    @handle_exceptions
    def get_all_products(self, page: int = 1):
        """
        Fetch all products with pagination.
        """
        limit_per_response = 5
        cursor = (
            products_collections.find({}, self.__all_products_projection)
            .limit(limit_per_response)
            .skip(limit_per_response * (page - 1))
        )
        products = [self.__serialize_product(product) for product in cursor]
        total_products = products_collections.count_documents({})

        return StandardSuccessResponse(
            data=products,
            message="Products retrieved successfully!",
            meta={
                "page": page,
                "limit": limit_per_response,
                "total_products": total_products,
                "products_in_response": len(products),
            },
        )

    @handle_exceptions
    def get_product_by_id(self, product_id: str):
        """
        Fetch a product by its ID.
        """
        product = self.__fetch_product(
            {"_id": ObjectId(product_id)}, self.__detailed_product_projection
        )
        if not product:
            return StandardErrorResponse(message="Product not found", status_code=404, code=40004)
        
        return StandardSuccessResponse(
            data=self.__serialize_product(product),
            message="Product retrieved successfully!",
        )

    @handle_exceptions
    def get_product_by_sku(self, sku: str):
        """
        Fetch a product by SKU.
        """
        product = self.__fetch_product(
            {"sku": {
                "$regex": f"^{sku}$",
                "$options": "i"
                }}, self.__detailed_product_projection
        )
        if not product:
            return StandardErrorResponse(message="Product not found", status_code=404, code=40004)

        return StandardSuccessResponse(
            data=self.__serialize_product(product),
            message="Product retrieved successfully!",
        )
