from pydantic import BaseModel

class User(BaseModel):
    id: str
    username: str
    email: str
    hashed_password: str