from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class MedicationLog(Base):
    __tablename__ = "MedicationLogs"

    log_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("MedicationPlan.plan_id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), nullable=False)
    taken_at: Mapped[datetime | None] = mapped_column(DateTime)

    plan: Mapped["MedicationPlan"] = relationship(back_populates="logs")
    user: Mapped["User"] = relationship()