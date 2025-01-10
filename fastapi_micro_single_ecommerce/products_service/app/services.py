from pydantic import BaseModel
from app.config import products_collections
from app.utils import StandardSuccessResponse, StandardErrorResponse




class ProductServices(BaseModel):
    def get_all_products(self, page):
        limit_per_response = 5
        try:
            products = products_collections.find({}, {
                "_id": 1,
                "sku": 1,
                "name"  : 1,
                "price": 1,
                "discount_price": 1,
                "category_id": 1,
                "sub_category_id": 1,
                "stock": 1,
                "images": 1,
                "tags": 1,
                "rating": 1,
                "status": 1,
            }).limit(limit_per_response).skip(limit_per_response * (page - 1))
            total_products = products_collections.count_documents({})
            
            serialized_products = [
                {
                    **product, 
                    "_id": str(product.get("_id")),
                    "category_id": str(product.get("category_id")),
                    "sub_category_id": str(product.get("sub_category_id")),
                } for product in products
                ]
            
            return StandardSuccessResponse(
                data=serialized_products,
                message="products retrieved successfully!",
                meta={
                    "page": page,
                    "limit": limit_per_response,
                    "total_products": total_products,
                    "products_in_response": len(serialized_products)
                }
                )
        except Exception as e:
            return StandardErrorResponse(
                message=e.__traceback__,
                status_code=500,
            )