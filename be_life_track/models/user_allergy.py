from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserAllergy(Base):
    __tablename__ = "user_allergies"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), primary_key=True)
    allergy_id: Mapped[int] = mapped_column(
        ForeignKey("allergies.allergy_id"), primary_key=True
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="user_allergies")
    allergy: Mapped["Allergy"] = relationship(back_populates="user_allergies")



