from __future__ import annotations

from datetime import date

from sqlalchemy import Date, Enum, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserDisease(Base):
    __tablename__ = "UserDiseases"

    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    disease_id: Mapped[int] = mapped_column(ForeignKey("Diseases.disease_id"), primary_key=True)
    diagnosed_at: Mapped[date | None] = mapped_column(Date)
    status: Mapped[str] = mapped_column(Enum("active", "recovered", name="user_disease_status"), default="active")

    user: Mapped["User"] = relationship()
    disease: Mapped["Disease"] = relationship(back_populates="user_diseases")