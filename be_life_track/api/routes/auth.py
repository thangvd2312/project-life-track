from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.schemas.auth import AuthenticatedUser, KakaoLoginRequest
from api.utils.response import success_response
from core.security import create_access_token
from db.session import get_db
from services.auth.kakao_service import KakaoAuthService

router = APIRouter(prefix="/auth", tags=["auth"])


def get_kakao_service(session: AsyncSession = Depends(get_db)) -> KakaoAuthService:
    """Dependency provider for KakaoAuthService"""
    return KakaoAuthService(session=session)


@router.post("/kakao")
async def login_with_kakao(
    payload: KakaoLoginRequest,
    kakao_service: KakaoAuthService = Depends(get_kakao_service),
):
    """
    Kakao login endpoint
    - Receives access token from client
    - Calls service to handle logic
    - Returns system JWT token with standard response format
    """
    user = await kakao_service.login(payload.access_token)

    access_token = create_access_token(user_id=user.user_id, name=user.name)

    data = {
        "token": access_token,
        "token_type": "bearer",
        "user": AuthenticatedUser(
            id=user.user_id, email=user.email, name=user.name
        ).model_dump(),
    }

    return success_response(data=data, message="Login successfully")


