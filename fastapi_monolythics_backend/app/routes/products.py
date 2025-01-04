from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.product import productBase
from app.config import db
from fastapi.responses import JSONResponse
from app.utils.standard_response import StandardResponse, ResponseType
from app.utils.serialize_mongo_document import serialize_mongo_collection, serialize_mongo_document
from bson import ObjectId
from app.constants.db_collections import COLLECTIONS

router = APIRouter()

PRODUCTS_COLLECTION = COLLECTIONS.PRODUCTS.value

@router.get("/")
async def list_products(page: Optional[int] = 1) -> List[productBase]:
    result_limit_per_page = 5
    
    try:
        products = await db[PRODUCTS_COLLECTION].find().limit(result_limit_per_page).skip(result_limit_per_page * (page -1)).to_list(length=result_limit_per_page)
        serialized_products = serialize_mongo_collection(products)
        response = StandardResponse(
            status=ResponseType.SUCCESS, data=serialized_products, 
            status_code=200,
            message=f"Products Fetched Successfully. Page No {page}, Limit {result_limit_per_page}"
            )
        return JSONResponse(content=response.model_dump())  
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=501, detail="Unexpected Error!") 

@router.get("/{product_id}")
async def get_product(product_id: str):
    try:
        product = await db[PRODUCTS_COLLECTION].find_one({"_id": ObjectId(product_id)})
        serialized_product = serialize_mongo_document(product)
        # print(product)
        response = StandardResponse(
            status=ResponseType.SUCCESS, 
            data=serialized_product, 
            status_code=200,
            message=f"Product Fetched Successfully. Product ID : {product_id}"
        )
        return JSONResponse(content=response.model_dump())
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=501, detail="Unexpected Error!")

@router.post("/")
async def add_product(new_product: productBase):
    try:
      response = await db[PRODUCTS_COLLECTION].insert_one(new_product)
    #   print(response)
      response = StandardResponse(
          status=ResponseType.SUCCESS,
          data=new_product,
          status_code=201,
          message=f"Product Added Successfully. Product ID : {response.inserted_id}"
          )
    except Exception as e:
        pass

@router.put("/{product_id}")
async def update_product():
    pass


@router.delete("/{product_id}")
async def list_products():
    pass


@router.get("/search")
async def list_products():
    pass

@router.get("/recommendations")
async def list_products():
    pass