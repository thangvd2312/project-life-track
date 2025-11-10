from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Allergy(Base):
    __tablename__ = "allergies"

    allergy_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    allergy_name: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    user_allergies: Mapped[list["UserAllergy"]] = relationship(back_populates="allergy")
