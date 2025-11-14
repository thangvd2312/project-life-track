"""
User routes - Protected endpoints that require authentication
"""
from fastapi import APIRouter, Depends

from api.dependencies.auth import get_current_user
from api.schemas.auth import AuthenticatedUser
from api.utils.response import success_response
from models.user import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me")
async def get_current_user_info(
    current_user: User = Depends(get_current_user),
):
    """
    Get current authenticated user information
    This endpoint is protected and requires a valid JWT token
    """
    user_data = AuthenticatedUser(
        id=current_user.user_id,
        email=current_user.email,
        name=current_user.name,
    )
    
    return success_response(data=user_data.model_dump(), message="User retrieved successfully")


@router.get("/profile")
async def get_user_profile(
    current_user: User = Depends(get_current_user),
):
    """
    Get detailed user profile
    This endpoint is protected and requires a valid JWT token
    """
    profile_data = {
        "user_id": current_user.user_id,
        "email": current_user.email,
        "name": current_user.name,
        "birthdate": current_user.birthdate.isoformat() if current_user.birthdate else None,
        "gender": current_user.gender,
        "phone_number": current_user.phone_number,
        "address": current_user.address,
        "provider": current_user.provider,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
    }
    
    return success_response(data=profile_data, message="Profile retrieved successfully")

