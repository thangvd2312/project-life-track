from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, func
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class BiomarkerLog(Base):
    __tablename__ = "BiomarkerLogs"

    log_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), nullable=False)
    biomarker_type: Mapped[str] = mapped_column(
        Enum("blood_pressure", "blood_sugar", "weight", "ecg", "sleep", "meal", name="biomarker_type"),
        nullable=False,
    )
    data: Mapped[dict | None] = mapped_column(JSON)
    measured_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    user: Mapped["User"] = relationship()