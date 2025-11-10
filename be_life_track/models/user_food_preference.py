from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserFoodPreference(Base):
    __tablename__ = "user_food_preferences"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), primary_key=True)
    preference_id: Mapped[int] = mapped_column(
        ForeignKey("food_preferences.preference_id"), primary_key=True
    )
    type: Mapped[str | None] = mapped_column(String(50))

    # Relationships
    user: Mapped["User"] = relationship(back_populates="user_food_preferences")
    food_preference: Mapped["FoodPreference"] = relationship(
        back_populates="user_food_preferences"
    )



