from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func, ForeignKey, Enum, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class User(Base):
    __tablename__ = "Users"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    institution_id: Mapped[int | None] = mapped_column(ForeignKey("Institutions.institution_id"), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), unique=True)
    password: Mapped[str | None] = mapped_column(String(255))
    name: Mapped[str | None] = mapped_column(String(100))
    birthdate: Mapped[datetime | None] = mapped_column(Date)
    gender: Mapped[str | None] = mapped_column(Enum("male", "female", "other", name="user_gender"))
    phone_number: Mapped[str | None] = mapped_column(String(50))
    address: Mapped[str | None] = mapped_column(String(255))
    provider: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    # Relationships
    institution: Mapped["Institution" | None] = relationship(back_populates="users")