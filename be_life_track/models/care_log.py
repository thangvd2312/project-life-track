from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class CareLog(Base):
    __tablename__ = "care_logs"

    log_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    admin_id: Mapped[int] = mapped_column(
        ForeignKey("admins.admin_id"), nullable=False
    )
    card_id: Mapped[int | None] = mapped_column(ForeignKey("care_cards.card_id"))
    action_type: Mapped[str | None] = mapped_column(String(255))
    content: Mapped[str | None] = mapped_column(Text)
    logged_at: Mapped[datetime | None] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="care_logs")
    admin: Mapped["Admin"] = relationship(back_populates="care_logs")
    care_card: Mapped["CareCard"] = relationship(back_populates="care_logs")



