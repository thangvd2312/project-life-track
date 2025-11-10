from datetime import date, datetime

from sqlalchemy import Date, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Institution(Base):
    __tablename__ = "institutions"

    institution_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str | None] = mapped_column(String(255))
    phone_number: Mapped[str | None] = mapped_column(String(50))
    logo_image_url: Mapped[str | None] = mapped_column(String(255))
    partnership_start_date: Mapped[date | None] = mapped_column(Date)
    partnership_end_date: Mapped[date | None] = mapped_column(Date)
    created_at: Mapped[datetime | None] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    # Relationships
    users: Mapped[list["User"]] = relationship(back_populates="institution")
    admins: Mapped[list["Admin"]] = relationship(back_populates="institution")
    groups: Mapped[list["Group"]] = relationship(back_populates="institution")
    care_cards: Mapped[list["CareCard"]] = relationship(back_populates="institution")
    library_contents: Mapped[list["LibraryContent"]] = relationship(
        back_populates="institution"
    )
    reports_monitoring: Mapped[list["ReportMonitoring"]] = relationship(
        back_populates="institution"
    )

