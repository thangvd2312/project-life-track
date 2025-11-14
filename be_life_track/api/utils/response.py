from __future__ import annotations

from typing import TypeVar

from fastapi import status
from fastapi.responses import JSONResponse

from api.schemas.response import ErrorResponse, SuccessResponse

T = TypeVar("T")


def success_response(data: T, code: int = status.HTTP_200_OK, message: str | None = None) -> JSONResponse:
    """
    Create a success response with standard format
    
    Args:
        data: Response data
        code: HTTP status code (default: 200)
        message: Optional success message
    
    Returns:
        JSONResponse with standard format
    """
    response = SuccessResponse(
        code=code,
        data=data,
        message=message,
    )
    return JSONResponse(
        status_code=code,
        content=response.model_dump(),
    )


def error_response(
    message: str, code: int = status.HTTP_400_BAD_REQUEST
) -> JSONResponse:
    """
    Create an error response with standard format
    
    Args:
        message: Error message
        code: HTTP status code (default: 400)
    
    Returns:
        JSONResponse with standard format
    """
    response = ErrorResponse(
        code=code,
        message=message,
    )
    return JSONResponse(
        status_code=code,
        content=response.model_dump(),
    )

