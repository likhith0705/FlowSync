from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Workflow, Task
from app.schemas import DashboardResponse
from app.routers.auth import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# =========================
# GET DASHBOARD STATISTICS
# =========================

@router.get(
    "/",
    response_model=DashboardResponse
)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =========================
    # WORKFLOW STATISTICS
    # =========================

    total_workflows = (
        db.query(Workflow)
        .filter(
            Workflow.owner_id == current_user.id
        )
        .count()
    )


    active_workflows = (
        db.query(Workflow)
        .filter(
            Workflow.owner_id == current_user.id,
            Workflow.status == "active"
        )
        .count()
    )


    # =========================
    # TASK STATISTICS
    # =========================

    total_tasks = (
        db.query(Task)
        .join(Workflow)
        .filter(
            Workflow.owner_id == current_user.id
        )
        .count()
    )


    todo_tasks = (
        db.query(Task)
        .join(Workflow)
        .filter(
            Workflow.owner_id == current_user.id,
            Task.status == "todo"
        )
        .count()
    )


    in_progress_tasks = (
        db.query(Task)
        .join(Workflow)
        .filter(
            Workflow.owner_id == current_user.id,
            Task.status == "in_progress"
        )
        .count()
    )


    completed_tasks = (
        db.query(Task)
        .join(Workflow)
        .filter(
            Workflow.owner_id == current_user.id,
            Task.status == "completed"
        )
        .count()
    )


    # =========================
    # OVERDUE TASKS
    # =========================

    current_time = datetime.utcnow()


    overdue_tasks = (
        db.query(Task)
        .join(Workflow)
        .filter(
            Workflow.owner_id == current_user.id,
            Task.due_date.isnot(None),
            Task.due_date < current_time,
            Task.status != "completed"
        )
        .count()
    )


    # =========================
    # COMPLETION PERCENTAGE
    # =========================

    completion_percentage = (
        round(
            (completed_tasks / total_tasks) * 100,
            2
        )
        if total_tasks > 0
        else 0.0
    )


    # =========================
    # RESPONSE
    # =========================

    return {
        "total_workflows": total_workflows,
        "active_workflows": active_workflows,

        "total_tasks": total_tasks,
        "todo_tasks": todo_tasks,
        "in_progress_tasks": in_progress_tasks,
        "completed_tasks": completed_tasks,
        "overdue_tasks": overdue_tasks,

        "completion_percentage": completion_percentage
    }