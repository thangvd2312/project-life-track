from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserHealthInfo(Base):
    __tablename__ = "user_health_info"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), primary_key=True
    )
    disease_id: Mapped[int] = mapped_column(
        ForeignKey("diseases.disease_id"), primary_key=True
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="user_health_info")
    disease: Mapped["Disease"] = relationship(back_populates="user_health_info")



