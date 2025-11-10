from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class LibraryContent(Base):
    __tablename__ = "library_contents"

    content_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    institution_id: Mapped[int] = mapped_column(
        ForeignKey("institutions.institution_id"), nullable=False
    )
    uploader_id: Mapped[int] = mapped_column(
        ForeignKey("admins.admin_id"), nullable=False
    )
    name: Mapped[str | None] = mapped_column(String(255))
    category: Mapped[str | None] = mapped_column(String(255))
    file_type: Mapped[str | None] = mapped_column(String(50))
    file_path: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime | None] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    # Relationships
    institution: Mapped["Institution"] = relationship(back_populates="library_contents")
    uploader: Mapped["Admin"] = relationship(back_populates="library_contents")

