from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class MedicationLog(Base):
    """Medication log with plan - from User App"""

    __tablename__ = "medication_log"

    log_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    plan_id: Mapped[int] = mapped_column(
        ForeignKey("medication_plan.plan_id"), nullable=False
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    taken_at: Mapped[datetime | None] = mapped_column(DateTime)

    # Relationships
    medication_plan: Mapped["MedicationPlan"] = relationship(
        back_populates="medication_logs"
    )
    user: Mapped["User"] = relationship(back_populates="medication_logs_with_plan")

