from pydantic import BaseModel
from typing import List

class CartItem(BaseModel):
    productID: str
    quantity: int 
    _id: str

class CartBase(BaseModel): 
    _id: str
    user_id: str
    created_at: str
    updated_at: str
    items: List[CartItem]