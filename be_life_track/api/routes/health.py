from __future__ import annotations

from fastapi import APIRouter

from core.logging import get_logger

router = APIRouter(tags=["health"])  # /health


@router.get("/health")
def health() -> dict[str, str]:
    logger = get_logger()
    logger.info("Health check OK")
    return {"status": "ok"}