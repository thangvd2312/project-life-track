from datetime import date, datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy import Date, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base

if TYPE_CHECKING:
    from models.biomarker_log import BiomarkerLog
    from models.care_log import CareLog
    from models.institution import Institution
    from models.medication_log import MedicationLog
    from models.medication_log_standalone import MedicationLogStandalone
    from models.medication_plan import MedicationPlan
    from models.report_user_app import ReportUserApp
    from models.risk import Risk
    from models.user_allergy import UserAllergy
    from models.user_care_card import UserCareCard
    from models.user_food_preference import UserFoodPreference
    from models.user_group import UserGroup
    from models.user_health_info import UserHealthInfo


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    institution_id: Mapped[int | None] = mapped_column(
        ForeignKey("institutions.institution_id")
    )
    email: Mapped[str | None] = mapped_column(String(255), unique=True)
    password: Mapped[str | None] = mapped_column(String(255))
    name: Mapped[str | None] = mapped_column(String(100))
    birthdate: Mapped[date | None] = mapped_column(Date)
    gender: Mapped[str | None] = mapped_column(String(50))
    phone_number: Mapped[str | None] = mapped_column(String(50))
    address: Mapped[str | None] = mapped_column(String(255))
    provider: Mapped[str | None] = mapped_column(String(50))
    provider_user_id: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    institution: Mapped["Institution | None"] = relationship(
        back_populates="users"
    )
    biomarker_logs: Mapped[list["BiomarkerLog"]] = relationship(back_populates="user")
    medication_plans: Mapped[list["MedicationPlan"]] = relationship(
        back_populates="user"
    )
    medication_logs_with_plan: Mapped[list["MedicationLog"]] = relationship(
        back_populates="user"
    )
    medication_logs_standalone: Mapped[list["MedicationLogStandalone"]] = relationship(
        back_populates="user"
    )
    user_health_info: Mapped[list["UserHealthInfo"]] = relationship(
        back_populates="user"
    )
    user_allergies: Mapped[list["UserAllergy"]] = relationship(back_populates="user")
    user_food_preferences: Mapped[list["UserFoodPreference"]] = relationship(
        back_populates="user"
    )
    user_groups: Mapped[list["UserGroup"]] = relationship(back_populates="user")
    user_care_cards: Mapped[list["UserCareCard"]] = relationship(back_populates="user")
    care_logs: Mapped[list["CareLog"]] = relationship(back_populates="user")
    risks: Mapped[list["Risk"]] = relationship(back_populates="user")
    reports_user_app: Mapped[list["ReportUserApp"]] = relationship(
        back_populates="user"
    )



