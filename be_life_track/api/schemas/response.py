from __future__ import annotations

from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class BaseResponse(BaseModel, Generic[T]):
    """Base response model for all API responses"""

    code: int
    data: T | None = None
    message: str | None = None


class SuccessResponse(BaseResponse[T]):
    """Success response model"""

    code: int = 200
    data: T
    message: str | None = None


class ErrorResponse(BaseResponse[None]):
    """Error response model"""

    code: int
    data: None = None
    message: str

