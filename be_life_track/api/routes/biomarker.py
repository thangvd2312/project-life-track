from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.utils.response import success_response
from api.schemas.biomarker import BiomarkerRequest, BiomarkerResponse
from api.dependencies.auth import get_current_user

from models.user import User
from services.biomarker_service import BiomarkerService
from db.session import get_db

router = APIRouter(prefix="/biomarker", tags=["biomarker"])


def get_biomarker_service(session: AsyncSession = Depends(get_db)) -> BiomarkerService:
    """Dependency provider for BiomarkerService"""
    return BiomarkerService(session=session)


@router.post("", response_model=BiomarkerResponse)
async def add_biomarker(
    payload: BiomarkerRequest, 
    biomarker_service: BiomarkerService = Depends(get_biomarker_service),
    current_user: User = Depends(get_current_user),
):
    biomarker_log = await biomarker_service._create_new_biomarker_log(payload, current_user)
    biomarker_schema = BiomarkerResponse.from_orm(biomarker_log)
    payload_data = biomarker_schema.to_json_dict()

    return success_response(data=payload_data)