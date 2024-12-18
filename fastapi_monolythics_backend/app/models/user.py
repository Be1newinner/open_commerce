from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True
    is_vendor: bool = False
    is_admin: bool = False
    
    
class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str