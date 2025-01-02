from pydantic import BaseModel
from typing import List
from datetime import datetime
from enum import Enum

class product_review(BaseModel):    
    rating:float
    comment:str

class venodr_details(BaseModel):    
    name:str
    contact_info:str
    
class ProductStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    OUT_OF_STOCK = "out_of_stock"

class product_variants(BaseModel):
    sku: str
    color: str
    stock: int
    price: int

class product_dimension(BaseModel):
    height: int
    width: int
    depth: int

class product_shipping(BaseModel):
    shipping_cost: int
    weight: float
    dimensions: product_dimension
    
class product_meta(BaseModel):
    meta_title: str
    meta_description: str
    meta_keywords: List[str]

class productBase(BaseModel):
    sku:str
    name:str
    description:str
    price: float
    discount_price: float
    # vendor_id
    # category_id:
    # sub_category_id
    stock: int
    images: List[str]
    tags: List[str]
    rating: float
    reviews: product_review
    created_at: datetime
    updated_at: datetime
    status: ProductStatus
    vendor_details: venodr_details
    variants: List[product_variants]
    shipping_details: product_shipping
    meta: product_meta 