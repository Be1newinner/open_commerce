from pydantic import BaseModel, EmailStr
# from app.models import Role
    
class UserRegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
    
class UserProfileSchema(BaseModel):
    username: str
    email: EmailStr