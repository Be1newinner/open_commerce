from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import List, Optional
from bson import ObjectId 
class Role(Enum):
    admin = 'admin'
    user = 'user'

class User(BaseModel):
    username: str
    email: str
    password: str
    role: Optional[Role] = Role.user.value
    
class UserInDB(User):
    _id: ObjectId
    timestamp: Optional[datetime] = datetime.now()
    version: Optional[int] = 0
    
class UserInApp(User):
        _id: str


