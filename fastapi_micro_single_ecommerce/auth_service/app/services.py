from app.utils import hash_password, verify_password, StandardErrorResponse, StandardSuccessResponse
from app.models import UserInDB, Role
from app.schemas import UserRegisterSchema, UserLoginSchema
from bson import ObjectId
from app.config import user_collection
from fastapi import HTTPException
# from datetime import datetime

class AuthService:
    async def register_user(user: UserRegisterSchema):
        # Register a new user
        
        try:
            hashed_pass = hash_password(user.password)
            user_data = UserInDB( 
                _id=ObjectId(),
                username=user.username,
                email=user.email,
                password=hashed_pass,
            )
            
            if user_collection.find_one({"email": user.email}):
                return StandardErrorResponse(
                    status_code=400, 
                    message="Email already exist!"
                    )
            
            new_user = user_collection.insert_one(user_data.model_dump())
            
            return StandardSuccessResponse(
                status_code=201, 
                message="User created successfully", 
                data={
                "user_id": str(new_user.inserted_id)
            }) 
        except Exception as e:
            print(e)
            
            return StandardErrorResponse(
                status_code=500, 
                message="Unable to register for a new account!",
                )
    
    async def login_user(user: UserLoginSchema):
        # Login an existing user
        user_data = user_collection.find_one({"email": user.email})
        if not user_data:
            return HTTPException(status_code=400, detail="Email or password is incorrect")
        
        if verify_password(user.password, user_data["password"]):
            return StandardSuccessResponse(
                status_code=200,
                message="User logged in successfully",
                data={
                    "user_id": str(user_data["_id"]),
                    "username": user_data["username"],
                    "email": user_data["email"],
                    "role": user_data["role"],
                    }
            )
        
        
    
    