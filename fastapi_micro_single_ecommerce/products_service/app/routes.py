from fastapi import APIRouter
from app.services import ProductServices
products_router = APIRouter()

product_services = ProductServices()

@products_router.get("/")
async def read_products(page: int):
    return product_services.get_all_products(page=page)

