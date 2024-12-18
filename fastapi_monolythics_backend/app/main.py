from fastapi import FastAPI
from app.routes import auth

app = FastAPI()

app.include_router(auth.router, prefix="/user", tags=["Authentication"])

@app.get("/")
def read_root():
    return {
        "msg":"Welcome to Open Commerce Backend",
        "type":"Monolythic", 
        "language":"Python", 
        "framework":"Fast API"
        }