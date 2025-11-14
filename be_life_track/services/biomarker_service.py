from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from datetime import datetime

from api.schemas.biomarker import BiomarkerRequest
from models.biomarker_log import BiomarkerLog
from models.user import User

class BiomarkerService:
    """Service for handling biomarker data"""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def _create_new_biomarker_log(self, data: BiomarkerRequest, user: User) -> BiomarkerLog:
        """Generic method to create a new biomarker log"""

        biomarker = BiomarkerLog(
            user_id=user.user_id, 
            type=data.type,
            data=data.data,
            measured_at=data.measured_at,
        )

        self.session.add(biomarker)

        try:
            await self.session.commit()
            await self.session.refresh(biomarker)
        except SQLAlchemyError as exc:
            await self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error during biomarker creation",
            ) from exc

        return biomarker
