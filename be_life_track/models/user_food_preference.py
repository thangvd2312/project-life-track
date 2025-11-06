from __future__ import annotations

from sqlalchemy import Enum, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserFoodPreference(Base):
    __tablename__ = "UserFoodPreferences"

    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    preference_id: Mapped[int] = mapped_column(ForeignKey("FoodPreferences.preference_id"), primary_key=True)
    type: Mapped[str] = mapped_column(Enum("like", "dislike", name="food_pref_type"))

    user: Mapped["User"] = relationship()
    preference: Mapped["FoodPreference"] = relationship(back_populates="user_food_preferences")