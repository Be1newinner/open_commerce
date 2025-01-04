from fastapi import APIRouter ,Depends, HTTPException
from app.schemas import UserRegisterSchema
from app.services import AuthService

auth_routes = APIRouter()
auth_service = AuthService()

@auth_routes.post("/register")
async def register(user: UserRegisterSchema):
    return await AuthService.register_user(user) 