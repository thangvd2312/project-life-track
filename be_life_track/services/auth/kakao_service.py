from __future__ import annotations

import random
import time
from typing import Any

import httpx
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.constants.kakao import (
    KAKAO_TOKEN_INFO_ENDPOINT,
    KAKAO_USER_INFO_ENDPOINT,
)
from models.user import User


class KakaoAuthService:
    """Service for handling Kakao login"""

    def __init__(self, session: AsyncSession, http_client: httpx.AsyncClient | None = None) -> None:
        self.session = session
        self.http_client = http_client or httpx.AsyncClient(
            timeout=httpx.Timeout(5.0, read=10.0)
        )

    async def login(self, access_token: str) -> User:
        """Public method: performs Kakao login flow"""
        is_valid = await self._check_token_validity(access_token)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Kakao access token",
            )

        kakao_profile = await self._fetch_kakao_profile(access_token)
        kakao_id, name, avatar_url = self._extract_profile(kakao_profile)

        user = await self._find_or_create_user(
            provider="kakao",
            provider_user_id=kakao_id,
            name=name,
        )
        return user

    async def _check_token_validity(self, access_token: str) -> bool:
        """Verify Kakao access token is valid"""
        try:
            response = await self.http_client.get(
                KAKAO_TOKEN_INFO_ENDPOINT,
                headers={"Authorization": f"Bearer {access_token}"},
            )
            print('response', response.json(), response.status_code, status.HTTP_200_OK)
            if response.status_code != status.HTTP_200_OK:
                return False

            data = response.json()
            app_id = data.get("appId")
            expected_app_id = settings.KAKAO_APP_ID

            if expected_app_id is None:
                return False
            try:
                return int(app_id) == int(expected_app_id)
            except (TypeError, ValueError):
                return False
        except httpx.HTTPError:
            return False

    async def _fetch_kakao_profile(self, access_token: str) -> dict[str, Any]:
        """Get user profile from Kakao"""
        response = await self.http_client.get(
            KAKAO_USER_INFO_ENDPOINT,
            headers={"Authorization": f"Bearer {access_token}"},
            params={"secure_resource": "true"},
        )
        if response.status_code != status.HTTP_200_OK:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to fetch Kakao profile",
            )
        return response.json()

    @staticmethod
    def _extract_profile(payload: dict[str, Any]) -> tuple[str, str | None, str | None]:
        kakao_id = str(payload.get("id"))
        kakao_account = payload.get("kakao_account") or {}
        profile = kakao_account.get("profile") or {}

        name = profile.get("nickname") or kakao_account.get("name")
        thumbnail = profile.get("thumbnail_image_url")

        if not kakao_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing Kakao user ID",
            )
        return kakao_id, name, thumbnail

    async def _find_or_create_user(
        self, provider: str, provider_user_id: str, name: str | None
    ) -> User:
        """
        Generic method to find or create user from any OAuth provider
        
        Args:
            provider: Provider name (e.g., "kakao", "google", "facebook")
            provider_user_id: User ID from the provider
            name: User name (optional, only used when creating new user)
        
        Returns:
            User object (existing or newly created)
        """
        result = await self.session.execute(
            select(User).where(
                User.provider == provider, User.provider_user_id == provider_user_id
            )
        )
        user = result.scalar_one_or_none()

        if user is None:
            # User doesn't exist, create new one
            user = await self._create_user(provider, provider_user_id, name)

        return user

    async def _create_user(
        self, provider: str, provider_user_id: str, name: str | None
    ) -> User:
        """Generic method to create a new user from any OAuth provider"""
        user = User(
            provider=provider,
            provider_user_id=provider_user_id,
            name=name,
        )
        self.session.add(user)
        try:
            await self.session.commit()
            await self.session.refresh(user)
        except SQLAlchemyError as exc:
            await self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error during user creation",
            ) from exc
        return user
