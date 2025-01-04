from pydantic import BaseModel, EmailStr

class UserRegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class UserLoginSchema(BaseModel):
    username: str
    password: str
    
class UserProfileSchema(BaseModel):
    username: str
    email: EmailStr