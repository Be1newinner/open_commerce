from fastapi import APIRouter
from app.constants.db_collections import COLLECTIONS

router = APIRouter()

CATEGORIES_COLLECTION = COLLECTIONS.CATEGORIES.value

@router.get("/")
async def read_root():
    pass