from __future__ import annotations

import asyncio

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

from api.middlewares.exception_handler import (
    generic_exception_handler,
    http_exception_handler,
    validation_exception_handler,
)
from api.routes.auth import router as auth_router
from api.routes.health import router as health_router
from api.routes.user import router as user_router
from core.config import settings
from core.logging import setup_logging
from db.session import engine


def create_app() -> FastAPI:
    setup_logging(settings.LOG_LEVEL)
    app = FastAPI(
        title=settings.APP_NAME,
        openapi_url="/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Register exception handlers (order matters: specific to general)
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(ValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)

    app.include_router(health_router)
    app.include_router(auth_router)
    app.include_router(user_router)

    @app.on_event("startup")
    async def on_startup() -> None:
        # Optional: ensure DB reachable on startup
        async with engine.begin() as conn:
            await conn.run_sync(lambda c: None)

    @app.on_event("shutdown")
    async def on_shutdown() -> None:
        await engine.dispose()

    return app


app = create_app()