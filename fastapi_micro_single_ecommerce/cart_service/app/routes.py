from fastapi import APIRouter
from app.models import 
cart_routes = APIRouter()

@cart_routes.get("/")
async def get_cart_item_list():
    pass

# Update Cart
# Accept Cart Item
@cart_routes.post("/")
async def update_item_quanity_in_cart(CartBase):
    pass

@cart_routes.delete("/{item_id}")
async def delete_item_from_cart(item_id: str):
    pass

@cart_routes.delete("/")
async def clear_cart():
    pass
