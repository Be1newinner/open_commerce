from fastapi import APIRouter, HTTPException, Depends
from app.models.user import UserCreate, UserInDB, UserRole
from app.utils.hashing import hash_password, verify_password
from app.utils.jwt_handler import create_access_token, verify_token
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from pydantic import BaseModel
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from app.config import db
# from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from app.utils.serialize_mongo_document import serialize_mongo_document

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    try:
        payload = verify_token(token)
        user = await db["users"].find_one({"email":payload["email"]})    
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid Credentials")
        serialised_user = serialize_mongo_document(user)
        response = UserInDB(
            email=serialised_user["email"], 
            name=serialised_user["name"], 
            id=serialised_user["_id"], 
            role=UserRole.__members__.get(serialised_user["role"].upper(), UserRole.CLIENT)
            )
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def get_current_user_role(user: UserInDB = Depends(get_current_user)) -> str:
    return user.role

@router.get("/")
async def get_all_users(current_user_role: str = Depends(get_current_user_role)):
    if current_user_role != "admin":
        raise HTTPException(status_code=403,detail="You are not authorised")
    else:
        users = await db["users"].find().to_list(10)
        serialized_users = [serialize_mongo_document(user) for user in users]
        print(serialized_users)
        return serialized_users
        
@router.post("/")
async def signup(user: UserCreate):
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    user_data["password"] = hash_password(user.password)
    await db["users"].insert_one(user_data)
    return {"msg":"User Created Successfully!"}

class LoginRequest(BaseModel):
    email:str
    password:str

@router.post("/login")
async def login(form_data: LoginRequest):
    user = await db["users"].find_one({"email": form_data.email})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    
    token = create_access_token(
        data={"email": user["email"], "role":user["role"]}, expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)
    return {"access_token": token, "token_type": "bearer"}

