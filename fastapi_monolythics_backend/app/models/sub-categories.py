from pydantic import BaseModel
from datetime import datetime
# from bson import datetime_ms

class SubCategoriesBase(BaseModel):
    name: str
    description: str
    image_url: str
    status: str
    updated_at: datetime
    created_at: datetime
    categoy_id: str