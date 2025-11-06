from __future__ import annotations

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserAllergy(Base):
    __tablename__ = "UserAllergies"

    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    allergy_id: Mapped[int] = mapped_column(ForeignKey("Allergies.allergy_id"), primary_key=True)

    user: Mapped["User"] = relationship()
    allergy: Mapped["Allergy"] = relationship(back_populates="user_allergies")