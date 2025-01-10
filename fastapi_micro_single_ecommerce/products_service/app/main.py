from fastapi import FastAPI
from app.routes import products_router

app = FastAPI()
app.include_router(products_router, prefix="/products", tags=["Basic"])
