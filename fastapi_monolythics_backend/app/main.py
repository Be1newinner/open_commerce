from fastapi import FastAPI, HTTPException, Request
from app.routes import auth, products
from fastapi.responses import JSONResponse
from app.utils.standard_response import StandardResponse

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/products", tags=["Products"])
  
@app.exception_handler(HTTPException)
async def http_exception_handler(request:Request, exc:HTTPException):
    """
    Handles HTTP exceptions by returning a standardized JSON response.

    Parameters:
        request (Request): The incoming HTTP request.
        exc (HTTPException): The exception raised during the request handling.

    Returns:
        JSONResponse: A JSON response containing the exception details.
    """
    print("ERROR : ", exc)
    return JSONResponse(
        content=StandardResponse(
        message=exc.detail,
        status_code=exc.status_code
        ).model_dump(),status_code=exc.status_code)

@app.get("/")
def read_root():
    return {
        "msg":"Welcome to Open Commerce Backend",
        "type":"Monolythic", 
        "language":"Python", 
        "framework":"Fast API"
        }