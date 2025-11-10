from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.session import Base


class UserGroup(Base):
    __tablename__ = "user_groups"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), primary_key=True)
    group_id: Mapped[int] = mapped_column(
        ForeignKey("groups.group_id"), primary_key=True
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="user_groups")
    group: Mapped["Group"] = relationship(back_populates="user_groups")



