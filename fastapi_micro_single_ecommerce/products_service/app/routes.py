from fastapi import APIRouter
from app.services import ProductServices

products_router = APIRouter()
product_services = ProductServices()

@products_router.get("/", tags=["Basics"])
async def read_products(page: int = 1):
    return product_services.get_all_products(page=page)

@products_router.get("/{id}", tags=["Basics"])
async def read_product_by_id(id: str):
    return product_services.get_product_by_id(product_id=id)

@products_router.get("/sku/{sku}", tags=["Basics"])
async def read_product_by_sku(sku: str):
    return product_services.get_product_by_sku(sku=sku)

@products_router.post("/", tags=["Admin"])
async def create_product(product: dict):
    return product_services.create_product(product=product)

@products_router.put("/{product_id}", tags=["Admin"])
async def update_product(product_id: str, product: dict):
    return product_services.update_product(product_id=product_id,update_data=product)

@products_router.delete("/{product_id}", tags=["Admin"])
async def delete_product(product_id: str):
    return product_services.delete_product(product_id=product_id)