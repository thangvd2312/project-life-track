from __future__ import annotations

import asyncio

from fastapi import FastAPI

from api.routes.health import router as health_router
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

    app.include_router(health_router)

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