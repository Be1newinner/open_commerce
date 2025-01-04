from pydantic import BaseModel
from enum import Enum
from typing import Optional, Any
from datetime import datetime

class ResponseType(str, Enum):
    ERROR = "error"
    SUCCESS = "success"

class StandardResponse(BaseModel):
    status: ResponseType = ResponseType.ERROR
    status_code: int = 500
    message: str = ""
    data: Optional[Any] = None
    timestamp: str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")