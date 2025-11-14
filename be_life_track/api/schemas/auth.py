from __future__ import annotations

from typing import Literal

from pydantic import BaseModel


class KakaoLoginRequest(BaseModel):
    access_token: str


class AuthenticatedUser(BaseModel):
    id: int
    email: str | None = None
    name: str | None = None


class AuthResponse(BaseModel):
    token: str
    token_type: Literal["bearer"] = "bearer"
    user: AuthenticatedUser

