from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Group(Base):
    __tablename__ = "Groups"

    group_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    institution_id: Mapped[int] = mapped_column(ForeignKey("Institutions.institution_id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    institution: Mapped["Institution"] = relationship(back_populates="groups")
    user_groups: Mapped[list["UserGroup"]] = relationship(back_populates="group", cascade="all, delete-orphan")