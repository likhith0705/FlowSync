from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Workflow, Task

from app.schemas import (
    WorkflowCreate,
    WorkflowResponse,
    WorkflowUpdate,
    WorkflowStatistics
)

from app.routers.auth import get_current_user
from app.services.activity import log_activity


router = APIRouter(
    prefix="/workflows",
    tags=["Workflows"]
)


# =========================
# CREATE WORKFLOW
# =========================

@router.post(
    "/",
    response_model=WorkflowResponse,
    status_code=status.HTTP_201_CREATED
)
def create_workflow(
    workflow: WorkflowCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_workflow = Workflow(
        name=workflow.name,
        description=workflow.description,
        owner_id=current_user.id
    )

    db.add(new_workflow)
    db.commit()
    db.refresh(new_workflow)


    log_activity(
        db=db,
        user_id=current_user.id,
        action="workflow_created",
        description=f'Created workflow "{new_workflow.name}"'
    )


    return new_workflow


# =========================
# GET MY WORKFLOWS
# =========================

@router.get(
    "/",
    response_model=list[WorkflowResponse]
)
def get_workflows(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    workflows = (
        db.query(Workflow)
        .filter(
            Workflow.owner_id == current_user.id
        )
        .all()
    )

    return workflows


# =========================
# GET SINGLE WORKFLOW
# =========================

@router.get(
    "/{workflow_id}",
    response_model=WorkflowResponse
)
def get_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    workflow = (
        db.query(Workflow)
        .filter(
            Workflow.id == workflow_id,
            Workflow.owner_id == current_user.id
        )
        .first()
    )


    if not workflow:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow not found"
        )


    return workflow


# =========================
# UPDATE WORKFLOW
# =========================

@router.put(
    "/{workflow_id}",
    response_model=WorkflowResponse
)
def update_workflow(
    workflow_id: int,
    workflow_update: WorkflowUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    workflow = (
        db.query(Workflow)
        .filter(
            Workflow.id == workflow_id,
            Workflow.owner_id == current_user.id
        )
        .first()
    )


    if not workflow:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow not found"
        )


    update_data = workflow_update.model_dump(
        exclude_unset=True
    )


    old_status = workflow.status


    for field, value in update_data.items():

        setattr(
            workflow,
            field,
            value
        )


    db.commit()

    db.refresh(workflow)


    # =========================
    # LOG STATUS CHANGE
    # =========================

    if (
        "status" in update_data
        and old_status != workflow.status
    ):

        log_activity(
            db=db,
            user_id=current_user.id,
            action="workflow_status_updated",
            description=(
                f'Changed workflow "{workflow.name}" '
                f'from {old_status} to {workflow.status}'
            )
        )


    return workflow


# =========================
# DELETE WORKFLOW
# =========================

@router.delete(
    "/{workflow_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    workflow = (
        db.query(Workflow)
        .filter(
            Workflow.id == workflow_id,
            Workflow.owner_id == current_user.id
        )
        .first()
    )


    if not workflow:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow not found"
        )


    workflow_name = workflow.name


    db.delete(workflow)

    db.commit()


    log_activity(
        db=db,
        user_id=current_user.id,
        action="workflow_deleted",
        description=f'Deleted workflow "{workflow_name}"'
    )


    return None


# =========================
# WORKFLOW STATISTICS
# =========================

@router.get(
    "/{workflow_id}/statistics",
    response_model=WorkflowStatistics
)
def get_workflow_statistics(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =========================
    # CHECK OWNERSHIP
    # =========================

    workflow = (
        db.query(Workflow)
        .filter(
            Workflow.id == workflow_id,
            Workflow.owner_id == current_user.id
        )
        .first()
    )


    if not workflow:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow not found"
        )


    # =========================
    # TOTAL TASKS
    # =========================

    total_tasks = (
        db.query(Task)
        .filter(
            Task.workflow_id == workflow_id
        )
        .count()
    )


    # =========================
    # TODO TASKS
    # =========================

    todo_tasks = (
        db.query(Task)
        .filter(
            Task.workflow_id == workflow_id,
            Task.status == "todo"
        )
        .count()
    )


    # =========================
    # IN PROGRESS TASKS
    # =========================

    in_progress_tasks = (
        db.query(Task)
        .filter(
            Task.workflow_id == workflow_id,
            Task.status == "in_progress"
        )
        .count()
    )


    # =========================
    # COMPLETED TASKS
    # =========================

    completed_tasks = (
        db.query(Task)
        .filter(
            Task.workflow_id == workflow_id,
            Task.status == "completed"
        )
        .count()
    )


    # =========================
    # COMPLETION PERCENTAGE
    # =========================

    if total_tasks > 0:

        completion_percentage = round(
            (
                completed_tasks
                / total_tasks
            ) * 100,
            2
        )

    else:

        completion_percentage = 0.0


    # =========================
    # RESPONSE
    # =========================

    return {

        "workflow_id":
            workflow_id,

        "total_tasks":
            total_tasks,

        "todo":
            todo_tasks,

        "in_progress":
            in_progress_tasks,

        "completed":
            completed_tasks,

        "completion_percentage":
            completion_percentage

    }