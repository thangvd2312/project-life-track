from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class FoodPreference(Base):
    __tablename__ = "food_preferences"

    preference_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    preference_name: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    user_food_preferences: Mapped[list["UserFoodPreference"]] = relationship(
        back_populates="food_preference"
    )
