from typing import Optional
from pydantic import BaseModel, EmailStr
from enum import Enum
# from bson import ObjectId

# Define roles as Enum for scalability
class UserRole(str, Enum):
    CLIENT = "client"
    VENDOR = "vendor"
    ADMIN = "admin"

# Base class for shared user fields
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    role: UserRole = UserRole.CLIENT

# Model for user creation (e.g., signup)
class UserCreate(UserBase):
    password: str

# Model for users stored in the database
class UserInDBWithPassword(UserBase):
    id: str
    password: str
    
# Model for fetching users stored from the database
class UserInDB(UserBase):
    id: str