from __future__ import annotations

from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Disease(Base):
    __tablename__ = "Diseases"

    disease_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)

    user_diseases: Mapped[list["UserDisease"]] = relationship(back_populates="disease", cascade="all, delete-orphan")