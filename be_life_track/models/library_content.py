from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class LibraryContent(Base):
    __tablename__ = "LibraryContents"

    content_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("Admins.admin_id"), nullable=False)
    institution_id: Mapped[int] = mapped_column(ForeignKey("Institutions.institution_id"), nullable=False)
    title: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    file_path: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.current_timestamp(), nullable=False)

    admin: Mapped["Admin"] = relationship()
    institution: Mapped["Institution"] = relationship()