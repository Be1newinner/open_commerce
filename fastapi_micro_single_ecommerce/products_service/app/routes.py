from fastapi import APIRouter
from app.services import ProductServices

products_router = APIRouter()
product_services = ProductServices()

@products_router.get("/")
async def read_products(page: int = 1):
    return product_services.get_all_products(page=page)

@products_router.get("/{id}")
async def read_product_by_id(id: str):
    return product_services.get_product_by_id(product_id=id)

@products_router.get("/sku/{sku}")
async def read_product_by_sku(sku: str):
    return product_services.get_product_by_sku(sku=sku)

