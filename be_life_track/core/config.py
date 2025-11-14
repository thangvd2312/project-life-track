from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "FastAPI Boilerplate"
    APP_ENV: Literal["development", "staging", "production"] = "development"
    DEBUG: bool = True

    DATABASE_URL: str

    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60

    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"

    KAKAO_APP_ID: int | None = None

    @field_validator("DATABASE_URL")
    @classmethod
    def validate_db_url(cls, v: str) -> str:
        if not (v.startswith("mysql+asyncmy://") or v.startswith("mysql+aiomysql://")):
            raise ValueError(
                "DATABASE_URL must use async driver: mysql+asyncmy or mysql+aiomysql"
            )
        return v


settings = Settings()