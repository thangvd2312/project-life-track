from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class Disease(Base):
    __tablename__ = "diseases"

    disease_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    disease_name: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    user_health_info: Mapped[list["UserHealthInfo"]] = relationship(
        back_populates="disease"
    )
