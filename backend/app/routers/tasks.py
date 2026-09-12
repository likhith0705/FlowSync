from datetime import datetime
from enum import Enum

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Query
)

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Task, User, Workflow

from app.schemas import (
    TaskCreate,
    TaskResponse,
    TaskUpdate,
    TaskStatus,
    TaskPriority,
    PaginatedTaskResponse
)

from app.routers.auth import get_current_user
from app.services.activity import log_activity


# =========================
# ROUTERS
# =========================

router = APIRouter(
    prefix="/workflows",
    tags=["Tasks"]
)


task_router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# =========================
# CREATE TASK
# =========================

@router.post(
    "/{workflow_id}/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    workflow_id: int,
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =========================
    # CHECK WORKFLOW OWNERSHIP
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
    # VALIDATE ASSIGNED USER
    # =========================

    if task.assigned_to is not None:

        assigned_user = (
            db.query(User)
            .filter(
                User.id == task.assigned_to
            )
            .first()
        )


        if not assigned_user:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Assigned user not found"
            )


    # =========================
    # CREATE TASK
    # =========================

    new_task = Task(

        title=task.title,

        description=task.description,

        priority=task.priority.value,

        due_date=task.due_date,

        workflow_id=workflow.id,

        assigned_to=task.assigned_to

    )


    db.add(new_task)

    db.commit()

    db.refresh(new_task)


    # =========================
    # ACTIVITY LOG
    # =========================

    log_activity(

        db=db,

        user_id=current_user.id,

        action="task_created",

        description=(
            f'Created task "{new_task.title}"'
        )

    )


    return new_task


# =========================
# GET TASKS IN WORKFLOW
# =========================

@router.get(
    "/{workflow_id}/tasks",
    response_model=PaginatedTaskResponse
)
def get_tasks(

    workflow_id: int,


    # =========================
    # FILTERS
    # =========================

    task_status: TaskStatus | None = None,

    priority: TaskPriority | None = None,

    search: str | None = Query(
        default=None,
        max_length=100
    ),


    # =========================
    # PAGINATION
    # =========================

    skip: int = Query(
        default=0,
        ge=0
    ),

    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),


    # =========================
    # SORTING
    # =========================

    sort_by: str = Query(
        default="created_at"
    ),

    order: str = Query(
        default="desc"
    ),


    # =========================
    # DEPENDENCIES
    # =========================

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):


    # =========================
    # CHECK WORKFLOW OWNERSHIP
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
    # BASE QUERY
    # =========================

    query = (

        db.query(Task)

        .filter(
            Task.workflow_id == workflow_id
        )

    )


    # =========================
    # FILTER BY STATUS
    # =========================

    if task_status is not None:

        query = query.filter(

            Task.status == task_status.value

        )


    # =========================
    # FILTER BY PRIORITY
    # =========================

    if priority is not None:

        query = query.filter(

            Task.priority == priority.value

        )


    # =========================
    # SEARCH TASKS
    # =========================

    if search:

        cleaned_search = search.strip()


        if cleaned_search:

            search_term = (
                f"%{cleaned_search}%"
            )


            query = query.filter(

                or_(

                    Task.title.ilike(
                        search_term
                    ),

                    Task.description.ilike(
                        search_term
                    )

                )

            )






    # =========================
    # TOTAL TASK COUNT
    # =========================

    total = query.count()


    # =========================
    # SAFE SORTING
    # =========================

    allowed_sort_fields = {

        "created_at":
            Task.created_at,

        "due_date":
            Task.due_date,

        "priority":
            Task.priority,

        "title":
            Task.title,

        "status":
            Task.status

    }


    sort_column = (
        allowed_sort_fields.get(
            sort_by
        )
    )


    if sort_column is None:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail=(
                "Invalid sort field. "
                "Allowed fields: "
                "created_at, due_date, "
                "priority, title, status"
            )

        )


    # =========================
    # VALIDATE SORT ORDER
    # =========================

    normalized_order = (
        order.lower()
    )


    if normalized_order not in [
        "asc",
        "desc"
    ]:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail=(
                "Order must be "
                "'asc' or 'desc'"
            )

        )


    # =========================
    # APPLY SORTING
    # =========================

    if normalized_order == "asc":

        query = query.order_by(
            sort_column.asc()
        )


    else:

        query = query.order_by(
            sort_column.desc()
        )


    # =========================
    # PAGINATION
    # =========================

    tasks = (

        query

        .offset(skip)

        .limit(limit)

        .all()

    )


    # =========================
    # RESPONSE
    # =========================

    return {

        "tasks":
            tasks,

        "total":
            total,

        "skip":
            skip,

        "limit":
            limit

    }





# =========================
# GET OVERDUE TASKS
# =========================

@task_router.get(
    "/overdue",
    response_model=list[TaskResponse]
)
def get_overdue_tasks(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):


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

        .order_by(
            Task.due_date.asc()
        )

        .all()

    )


    return overdue_tasks


# =========================
# GET SINGLE TASK
# =========================

@task_router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task(

    task_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):


    task = (

        db.query(Task)

        .join(Workflow)

        .filter(

            Task.id == task_id,

            Workflow.owner_id == current_user.id

        )

        .first()

    )


    if not task:

        raise HTTPException(

            status_code=status.HTTP_404_NOT_FOUND,

            detail="Task not found"

        )


    return task


# =========================
# UPDATE TASK
# =========================

@task_router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task(

    task_id: int,

    task_update: TaskUpdate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):


    # =========================
    # FIND TASK + CHECK OWNERSHIP
    # =========================

    task = (

        db.query(Task)

        .join(Workflow)

        .filter(

            Task.id == task_id,

            Workflow.owner_id == current_user.id

        )

        .first()

    )


    if not task:

        raise HTTPException(

            status_code=status.HTTP_404_NOT_FOUND,

            detail="Task not found"

        )


    # =========================
    # GET PROVIDED FIELDS
    # =========================

    update_data = (
        task_update.model_dump(
            exclude_unset=True
        )
    )


    # =========================
    # VALIDATE ASSIGNED USER
    # =========================

    if "assigned_to" in update_data:


        assigned_to = (
            update_data["assigned_to"]
        )


        if assigned_to is not None:


            assigned_user = (

                db.query(User)

                .filter(
                    User.id == assigned_to
                )

                .first()

            )


            if not assigned_user:

                raise HTTPException(

                    status_code=status.HTTP_404_NOT_FOUND,

                    detail="Assigned user not found"

                )


    # =========================
    # STORE OLD STATUS
    # =========================

    old_status = task.status


    # =========================
    # UPDATE TASK
    # =========================

    for field, value in update_data.items():

        if isinstance(value, Enum):

            value = value.value


        setattr(
            task,
            field,
            value
        )


    db.commit()

    db.refresh(task)


    # =========================
    # ACTIVITY LOGGING
    # =========================

    if (

        "status" in update_data

        and old_status != "completed"

        and task.status == "completed"

    ):

        log_activity(

            db=db,

            user_id=current_user.id,

            action="task_completed",

            description=(
                f'Completed task "{task.title}"'
            )

        )


    else:

        log_activity(

            db=db,

            user_id=current_user.id,

            action="task_updated",

            description=(
                f'Updated task "{task.title}"'
            )

        )


    return task


# =========================
# DELETE TASK
# =========================

@task_router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_task(

    task_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):


    # =========================
    # FIND TASK + CHECK OWNERSHIP
    # =========================

    task = (

        db.query(Task)

        .join(Workflow)

        .filter(

            Task.id == task_id,

            Workflow.owner_id == current_user.id

        )

        .first()

    )


    if not task:

        raise HTTPException(

            status_code=status.HTTP_404_NOT_FOUND,

            detail="Task not found"

        )


    # =========================
    # SAVE TASK TITLE
    # =========================

    task_title = task.title


    # =========================
    # DELETE TASK
    # =========================

    db.delete(task)

    db.commit()


    # =========================
    # ACTIVITY LOGGING
    # =========================

    log_activity(

        db=db,

        user_id=current_user.id,

        action="task_deleted",

        description=(
            f'Deleted task "{task_title}"'
        )

    )


    return None