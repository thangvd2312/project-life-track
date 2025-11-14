from __future__ import annotations

from fastapi import APIRouter

from api.utils.response import success_response
from core.logging import get_logger

router = APIRouter(tags=["health"])  # /health


@router.get("/health")
def health():
    """Health check endpoint"""
    logger = get_logger()
    logger.info("Health check OK")
    return success_response(data={"status": "ok"})