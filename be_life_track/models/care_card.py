from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class CareCard(Base):
    __tablename__ = "care_cards"

    card_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    institution_id: Mapped[int] = mapped_column(
        ForeignKey("institutions.institution_id"), nullable=False
    )
    name: Mapped[str | None] = mapped_column(String(255))
    category: Mapped[str | None] = mapped_column(String(255))
    period: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)

    # Relationships
    institution: Mapped["Institution"] = relationship(back_populates="care_cards")
    user_care_cards: Mapped[list["UserCareCard"]] = relationship(
        back_populates="care_card"
    )
    care_logs: Mapped[list["CareLog"]] = relationship(back_populates="care_card")
