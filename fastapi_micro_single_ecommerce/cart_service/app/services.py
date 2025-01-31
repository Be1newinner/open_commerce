from pydantic import BaseModel
from app.config import carts_collection

class cart_service(BaseModel):
    async def get_cart_list():
        data = carts_collection.find({})
        