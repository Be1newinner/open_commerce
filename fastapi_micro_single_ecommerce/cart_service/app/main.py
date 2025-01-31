from fastapi import FastAPI
from app.routes import cart_routes

app = FastAPI()

app.include_router(cart_routes, prefix="/cart")