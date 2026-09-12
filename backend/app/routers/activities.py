from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Activity, User
from app.schemas import ActivityResponse
from app.routers.auth import get_current_user


router = APIRouter(
    prefix="/activities",
    tags=["Activities"]
)


# =========================
# GET MY ACTIVITIES
# =========================

@router.get(
    "/",
    response_model=list[ActivityResponse]
)
def get_activities(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    activities = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .order_by(Activity.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return activities