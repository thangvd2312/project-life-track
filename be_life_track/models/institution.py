from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Institution(Base):
    __tablename__ = "Institutions"

    institution_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str | None] = mapped_column(String(255))
    phone_number: Mapped[str | None] = mapped_column(String(50))
    partnership_start_date: Mapped[datetime | None] = mapped_column(Date)
    partnership_end_date: Mapped[datetime | None] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    # Relationships
    admins: Mapped[list["Admin"]] = relationship(back_populates="institution", cascade="all, delete-orphan")
    users: Mapped[list["User"]] = relationship(back_populates="institution", cascade="all, delete-orphan")
    groups: Mapped[list["Group"]] = relationship(back_populates="institution", cascade="all, delete-orphan")