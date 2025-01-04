from fastapi import FastAPI
from app.routes import auth_routes

app = FastAPI()

app.include_router(auth_routes, prefix="/auth")