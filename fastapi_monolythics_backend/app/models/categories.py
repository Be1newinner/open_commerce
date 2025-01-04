from pydantic import BaseModel
from datetime import datetime

class CategoriesBase(BaseModel):
    name: str
    description: str
    image_url: str
    status: str
    updated_at: datetime
    created_at: datetime