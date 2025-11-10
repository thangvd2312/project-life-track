"""
SQLAlchemy Models for Life Track System
Each file represents one database table
"""

from models.admin import Admin
from models.allergy import Allergy
from models.biomarker_log import BiomarkerLog
from models.care_card import CareCard
from models.care_log import CareLog
from models.disease import Disease
from models.food_preference import FoodPreference
from models.group import Group
from models.institution import Institution
from models.library_content import LibraryContent
from models.medication_log import MedicationLog
from models.medication_log_standalone import MedicationLogStandalone
from models.medication_plan import MedicationPlan
from models.report_monitoring import ReportMonitoring
from models.report_user_app import ReportUserApp
from models.risk import Risk
from models.user import User
from models.user_allergy import UserAllergy
from models.user_care_card import UserCareCard
from models.user_food_preference import UserFoodPreference
from models.user_group import UserGroup
from models.user_health_info import UserHealthInfo

__all__ = [
    # Institution
    "Institution",
    # User
    "User",
    # Admin
    "Admin",
    # Groups
    "Group",
    "UserGroup",
    # Diseases
    "Disease",
    "UserHealthInfo",
    # Biomarker Logs
    "BiomarkerLog",
    # Medication
    "MedicationPlan",
    "MedicationLog",
    "MedicationLogStandalone",
    # Allergies
    "Allergy",
    "UserAllergy",
    # Food Preferences
    "FoodPreference",
    "UserFoodPreference",
    # Care
    "CareCard",
    "UserCareCard",
    "CareLog",
    # Risks
    "Risk",
    # Reports
    "ReportUserApp",
    "ReportMonitoring",
    # Library
    "LibraryContent",
]
