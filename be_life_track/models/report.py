from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Report(Base):
    __tablename__ = "Reports"

    report_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    scope: Mapped[str] = mapped_column(Enum("user", "group", "institution", name="report_scope"), nullable=False)
    target_id: Mapped[int] = mapped_column(Integer, nullable=False)
    institution_id: Mapped[int] = mapped_column(ForeignKey("Institutions.institution_id"), nullable=False)
    name: Mapped[str | None] = mapped_column(String(255))
    topic: Mapped[str | None] = mapped_column(String(255))
    file_path: Mapped[str | None] = mapped_column(String(255))
    created_by: Mapped[int | None] = mapped_column(ForeignKey("Admins.admin_id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    institution: Mapped["Institution"] = relationship()
    created_by_admin: Mapped["Admin" | None] = relationship()