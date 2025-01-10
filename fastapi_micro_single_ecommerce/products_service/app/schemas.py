from pydantic import BaseModel
from typing import List
from datetime import datetime
from enum import Enum

class ReviewBase(BaseModel):
    """Base model for review"""
    reviewer_id: str
    rating: int
    comment: str
    
class VariantsBase(BaseModel):
    """Base model for variants"""
    sku: str
    color: str
    stock: int
    price: int

class ProductDimensions(BaseModel):
    """Base model for product dimensions"""
    height: int
    width: int
    depth: int

class ShippingDetailsBase(BaseModel):
    """Base model for Shipping Details Base"""
    dimensions =  ProductDimensions
    weight: float
    shipping_cost: int
    
class ProductStatus(Enum):
    """Enum for product status"""
    ACTIVE = "active"
    IN_ACTIVE = "inactive"
    OUT_OF_STOCK = "out_of_stock"
    
class ProductMetaBase(BaseModel):
    """Base model for product meta"""
    meta_title: str
    meta_description: str
    meta_keywords: List[str]

class ProductsBase(BaseModel):
    """Base model for products"""
    _id: str
    sku: str
    name  : str
    description: str
    price: int
    discount_price: float
    category_id: str
    sub_category_id: str
    stock: int
    images: List[str]
    tags: List[str]
    rating: float
    reviews: List[ReviewBase]
    created_at: datetime
    updated_at: datetime
    status: ProductStatus
    variants: List[VariantsBase]
    shipping_details: ShippingDetailsBase
    meta: ProductMetaBase