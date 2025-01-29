from fastapi import APIRouter 
from app.schemas import UserRegisterSchema, UserLoginSchema
from app.services import AuthService

auth_routes = APIRouter()
auth_service = AuthService()

@auth_routes.post("/register")
async def register(user: UserRegisterSchema):
    return await AuthService.register_user(user) 

@auth_routes.post("/login")
async def login(user: UserLoginSchema):
    return await AuthService.login_user(user) 