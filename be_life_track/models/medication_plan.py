from datetime import date

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class MedicationPlan(Base):
    __tablename__ = "medication_plan"

    plan_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    medication_name: Mapped[str | None] = mapped_column(String(255))
    routine_info: Mapped[str | None] = mapped_column(Text)
    start_date: Mapped[date | None] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="medication_plans")
    medication_logs: Mapped[list["MedicationLog"]] = relationship(
        back_populates="medication_plan"
    )
