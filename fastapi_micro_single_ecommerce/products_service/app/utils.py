from typing import Any, Dict, Optional, Union
from fastapi.responses import JSONResponse

def StandardResponse(
    status: str,
    message: str,
    data: Optional[Union[Dict, Any]] = None,
    meta: Optional[Dict] = None,
    code: int = None,
    status_code: int = 200
) -> JSONResponse:
    """
    Returns a uniform response for both success and error cases.
    
    Args:
        status (str): Either "success" or "error".
        message (str): Descriptive message for the response.
        data (Optional[Union[Dict, Any]]): Data payload (default: None for errors).
        meta (Optional[Dict]): Additional metadata (default: None).
        code (int): Application-specific or HTTP status code (default: 2000).
        status_code (int): HTTP status code (default: 200 for success).
    
    Returns:
        JSONResponse: Standardized JSON response.
    """
    response = {
        "status": status,
        "message": message,
        "data": data if data else None,
        "meta": meta if meta else None,
        "code": code if code else None,
        "status_code": status_code
    }

    return JSONResponse(content=response, status_code=status_code)

def StandardSuccessResponse(
    data: Union[Dict, Any],
    message: str = "Operation successful",
    meta: Optional[Dict] = None,
    status_code: int = 200
) -> JSONResponse:
    return StandardResponse(
        status="success",
        message=message,
        data=data,
        meta=meta,
        status_code=status_code
    )

def StandardErrorResponse(
    message: str,
    code: int = 4000,
    status_code: int = 400
) -> JSONResponse:
    return StandardResponse(
        status="error",
        message=message,
        data=None,
        code=code,
        status_code=status_code,
        meta=None
    )
