from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict, EmailStr



# =========================
# ENUMS
# =========================

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"



# =========================
# USER SCHEMAS
# =========================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =========================
# AUTHENTICATION SCHEMAS
# =========================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# =========================
# WORKFLOW SCHEMAS
# =========================

class WorkflowCreate(BaseModel):
    name: str
    description: str | None = None


class WorkflowResponse(BaseModel):
    id: int
    name: str
    description: str | None
    status: str
    owner_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =========================
# TASK SCHEMAS
# =========================

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: datetime | None = None
    assigned_to: int | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    due_date: datetime | None = None
    assigned_to: int | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: TaskStatus
    priority: TaskPriority
    due_date: datetime | None
    workflow_id: int
    assigned_to: int | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =========================
# PAGINATED TASK RESPONSE
# =========================

class PaginatedTaskResponse(BaseModel):

    tasks: list[TaskResponse]

    total: int

    skip: int

    limit: int



class WorkflowUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None


# =========================
# WORKFLOW STATISTICS
# =========================

class WorkflowStatistics(BaseModel):
    workflow_id: int
    total_tasks: int
    todo: int
    in_progress: int
    completed: int
    completion_percentage: float


# =========================
# ACTIVITY SCHEMAS
# =========================

class ActivityResponse(BaseModel):
    id: int
    action: str
    description: str
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =========================
# DASHBOARD SCHEMAS
# =========================

class DashboardResponse(BaseModel):
    total_workflows: int
    active_workflows: int

    total_tasks: int
    todo_tasks: int
    in_progress_tasks: int
    completed_tasks: int
    overdue_tasks: int

    completion_percentage: float

    