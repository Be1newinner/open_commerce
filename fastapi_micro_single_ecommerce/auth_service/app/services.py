from app.utils import hash_password
from app.models import User
from app.schemas import UserRegisterSchema
from bson import ObjectId
from app.config import user_collection
from fastapi import HTTPException

class AuthService:
    async def register_user(self, user: UserRegisterSchema):
        # Register a new user
        hashed_pass = hash_password(user.password)
        user_data = User( 
            id=str(ObjectId()),
            username=user.username,
            email=user.email,
            password=hashed_pass,
        )
        if user_collection.find_one({"email": user.email}):
            return HTTPException(status_code=400, detail="Email already exist!")
        new_user = user_collection.insert_one(user_data.model_dump())
        return {"message": "User created successfully" + new_user.__inserted_id}
    
    async def login_user():
        # Login an existing user
        pass
    
    