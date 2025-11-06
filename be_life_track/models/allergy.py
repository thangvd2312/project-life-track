from __future__ import annotations

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Allergy(Base):
    __tablename__ = "Allergies"

    allergy_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    allergy_name: Mapped[str] = mapped_column(String(255), nullable=False)

    user_allergies: Mapped[list["UserAllergy"]] = relationship(back_populates="allergy", cascade="all, delete-orphan")