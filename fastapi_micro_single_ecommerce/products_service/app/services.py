from pydantic import BaseModel
from app.models import ProductModel
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

    @handle_exceptions
    def get_all_products(self, page: int = 1, limit: int = 5):
        """
        Fetch all products with pagination.
        """
        filters = {}
        products = ProductModel.get_all(
            filters=filters, projection=self.__all_products_projection, limit=limit, page=page
        )
        total_products = ProductModel.get_all(filters).count()

        return StandardSuccessResponse(
            data=[self.__serialize_product(product) for product in products],
            message="Products retrieved successfully!",
            meta={
                "page": page,
                "limit": limit,
                "total_products": total_products,
                "products_in_response": len(products),
            },
        )

    @handle_exceptions
    def get_product_by_id(self, product_id: str):
        """
        Fetch a product by its ID.
        """
        product = ProductModel.get_by_id(product_id, self.__detailed_product_projection)
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
        product = ProductModel.get_by_sku(sku, self.__detailed_product_projection)
        if not product:
            return StandardErrorResponse(message="Product not found", status_code=404, code=40004)

        return StandardSuccessResponse(
            data=self.__serialize_product(product),
            message="Product retrieved successfully!",
        )

    @handle_exceptions
    def create_product(self, product_data: dict):
        """
        Create a new product.
        """
        product_data["created_at"] = datetime.now(datetime.timezone.utc)
        product_data["updated_at"] = datetime.now(datetime.timezone.utc)
        result = ProductModel.insert(product_data)

        return StandardSuccessResponse(
            data={"product_id": str(result.inserted_id)},
            message="Product created successfully!",
            status_code=201
        )

    @handle_exceptions
    def update_product(self, product_id: str, update_data: dict):
        """
        Update an existing product by ID.
        """
        update_data["updated_at"] = datetime.now(datetime.timezone.utc)
        result = ProductModel.update(product_id, update_data)

        if result.matched_count == 0:
            return StandardErrorResponse(message="Product not found", status_code=404, code=40004)
        
        return StandardSuccessResponse(
            data={"updated_count": result.modified_count},
            message="Product updated successfully!",
        )

    @handle_exceptions
    def delete_product(self, product_id: str):
        """
        Delete a product by its ID.
        """
        result = ProductModel.delete(product_id)

        if result.deleted_count == 0:
            return StandardErrorResponse(message="Product not found", status_code=404, code=40004)
        
        return StandardSuccessResponse(
            data={"deleted_count": result.deleted_count},
            message="Product deleted successfully!",
        )
