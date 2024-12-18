from fastapi import APIRouter, HTTPException
import motor.motor_asyncio
from app.models.user import UserCreate
from app.utils.hashing import hash_password

router = APIRouter()

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

db = client["fastapi_ecommerce"]

@router.post("/signup")
async def signup(user: UserCreate):
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        return HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["hashed_password"] = hashed_password
    del user_data["password"]
    await db["users"].insert_one(user_data)
    return {"msg":"User Created Successfully!"}

