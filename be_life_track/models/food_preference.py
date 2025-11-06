from __future__ import annotations

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class FoodPreference(Base):
    __tablename__ = "FoodPreferences"

    preference_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    preference_name: Mapped[str] = mapped_column(String(255), nullable=False)

    user_food_preferences: Mapped[list["UserFoodPreference"]] = relationship(back_populates="preference", cascade="all, delete-orphan")