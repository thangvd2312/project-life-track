from __future__ import annotations

from typing import Literal
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class BiomarkerType(str, Enum):
    BLOOD_PRESSURE = "blood_pressure"
    BLOOD_SUGAR = "blood_sugar"
    WEIGHT = "weight"
    ECG = "ecg"
    SLEEP = "sleep"
    MEAL = "meal"

class BiomarkerRequest(BaseModel):
    type: BiomarkerType
    data: dict
    measured_at: datetime


class BiomarkerResponse(BaseModel):
    log_id: int
    user_id: int
    type: BiomarkerType
    data: dict
    measured_at: datetime

    model_config = {
        "from_attributes": True 
    }

    def to_json_dict(self):
        return self.model_dump(mode="json")