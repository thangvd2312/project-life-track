from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserCareCard(Base):
    __tablename__ = "user_care_cards"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), primary_key=True)
    card_id: Mapped[int] = mapped_column(
        ForeignKey("care_cards.card_id"), primary_key=True
    )
    assigned_at: Mapped[datetime | None] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="user_care_cards")
    care_card: Mapped["CareCard"] = relationship(back_populates="user_care_cards")



