from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Enum, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserGroup(Base):
    __tablename__ = "UserGroups"

    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("Groups.group_id"), primary_key=True)
    joined_at: Mapped[datetime | None] = mapped_column(DateTime, server_default=func.current_timestamp())
    status: Mapped[str] = mapped_column(Enum("active", "inactive", name="user_group_status"), default="active")

    user: Mapped["User"] = relationship()
    group: Mapped["Group"] = relationship(back_populates="user_groups")