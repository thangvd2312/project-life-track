from __future__ import annotations

from datetime import datetime, date

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class MedicationPlan(Base):
    __tablename__ = "MedicationPlan"

    plan_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), nullable=False)
    medication_name: Mapped[str | None] = mapped_column(String(255))
    routine_info: Mapped[str | None] = mapped_column(Text)
    start_date: Mapped[date | None] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    user: Mapped["User"] = relationship()
    logs: Mapped[list["MedicationLog"]] = relationship(back_populates="plan", cascade="all, delete-orphan")