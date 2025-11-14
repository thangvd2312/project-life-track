from datetime import datetime, timedelta, timezone
from typing import Any, Dict

from jose import JWTError, jwt
from passlib.context import CryptContext

from core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(
    user_id: int,
    name: str | None = None,
    expires_delta: timedelta | None = None,
    expires_minutes: int | None = None,
) -> str:
    """
    Create JWT access token with user_id and name
    
    Args:
        user_id: User ID
        name: User name (optional)
        expires_delta: Token expiration time delta
        expires_minutes: Token expiration time in minutes
    
    Returns:
        Encoded JWT token
    """
    if expires_delta is not None:
        expire = datetime.now(tz=timezone.utc) + expires_delta
    else:
        minutes = expires_minutes or settings.JWT_EXPIRATION_MINUTES or (60 * 24)
        expire = datetime.now(tz=timezone.utc) + timedelta(minutes=minutes)

    to_encode: Dict[str, Any] = {
        "sub": str(user_id),
        "user_id": user_id,
        "exp": expire,
    }
    
    if name:
        to_encode["name"] = name
    
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> Dict[str, Any]:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except JWTError as e:
        raise ValueError("Invalid token") from e