from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.config import SECRET_KEY, ALGORITHM

def create_access_token(data: dict, expires_delta: int):
    to_encode= data.copy()
    expire= datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None