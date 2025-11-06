from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserCareManager(Base):
    __tablename__ = "UserCareManagers"

    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("Admins.admin_id"), primary_key=True)
    role: Mapped[str] = mapped_column(Enum("doctor", "nurse", "nutritionist", "coach", name="care_manager_role"), default="doctor")
    assigned_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    user: Mapped["User"] = relationship()
    admin: Mapped["Admin"] = relationship()