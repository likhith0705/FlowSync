export const CATEGORIES = {
  client: {
    name: "User & Client Layer",
    color: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.25)",
    glowColor: "rgba(56, 189, 248, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    badgeText: "#7DD3FC"
  },
  frontend: {
    name: "React Frontend",
    color: "#60A5FA",
    borderColor: "rgba(96, 165, 250, 0.25)",
    glowColor: "rgba(96, 165, 250, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(96, 165, 250, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeText: "#93C5FD"
  },
  auth: {
    name: "Authentication & Security",
    color: "#A78BFA",
    borderColor: "rgba(167, 139, 250, 0.25)",
    glowColor: "rgba(167, 139, 250, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(167, 139, 250, 0.12)",
    badgeText: "#C4B5FD"
  },
  backend: {
    name: "FastAPI Backend & Routers",
    color: "#34D399",
    borderColor: "rgba(52, 211, 153, 0.25)",
    glowColor: "rgba(52, 211, 153, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(52, 211, 153, 0.12)",
    badgeText: "#6EE7B7"
  },
  services: {
    name: "Business Logic & Services",
    color: "#FBBF24",
    borderColor: "rgba(251, 191, 36, 0.25)",
    glowColor: "rgba(251, 191, 36, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(251, 191, 36, 0.12)",
    badgeText: "#FDE68A"
  },
  orm: {
    name: "SQLAlchemy ORM Layer",
    color: "#2DD4BF",
    borderColor: "rgba(45, 212, 191, 0.25)",
    glowColor: "rgba(45, 212, 191, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(45, 212, 191, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    badgeText: "#99F6E4"
  },
  database: {
    name: "PostgreSQL Database Layer",
    color: "#F87171",
    borderColor: "rgba(248, 113, 113, 0.25)",
    glowColor: "rgba(248, 113, 113, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(248, 113, 113, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(248, 113, 113, 0.12)",
    badgeText: "#FCA5A5"
  }
};

export const INITIAL_NODES = [
  // -------------------------------------------------------------
  // COLUMN 1: USER / CLIENT (X = 50)
  // -------------------------------------------------------------
  {
    id: "user-client",
    type: "custom",
    position: { x: 50, y: 280 },
    data: {
      title: "User / Client",
      subtitle: "Web Browser & Client Devices",
      category: "client",
      iconName: "User",
      techs: ["Web Browser", "HTTP/REST", "JSON"],
      purpose: "Initiates interactive requests for managing workflows, executing tasks, and viewing analytical dashboards.",
      files: [
        { path: "frontend/index.html", desc: "HTML entry point with root mount element" },
        { path: "frontend/src/main.tsx", desc: "React root rendering setup" }
      ],
      responsibilities: [
        "Sends HTTP REST requests to FastAPI backend",
        "Stores JWT auth token securely in browser localStorage",
        "Renders responsive UI using React, Tailwind CSS, and Lucide icons",
        "Handles user interactions, filtering, and live search"
      ],
      codeSnippet: `// Standard HTTP request authorization header sent by client
Authorization: Bearer <jwt_access_token>`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 2: FRONTEND LAYER (X = 380)
  // -------------------------------------------------------------
  {
    id: "frontend-auth-pages",
    type: "custom",
    position: { x: 380, y: 20 },
    data: {
      title: "Authentication Pages",
      subtitle: "Login & Register Components",
      category: "frontend",
      iconName: "Lock",
      techs: ["React", "TypeScript", "Lucide React", "Axios"],
      purpose: "Provides user onboarding and login UI forms with input validation and error feedback.",
      files: [
        { path: "frontend/src/pages/Login.tsx", desc: "Login page component with credential dispatch" },
        { path: "frontend/src/pages/Register.tsx", desc: "User registration page component" }
      ],
      responsibilities: [
        "Collects user email and password inputs",
        "Validates credentials before submitting to Auth API",
        "Stores received access_token in localStorage",
        "Redirects authenticated users to the /dashboard view"
      ],
      codeSnippet: `const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  await login({ email, password });
  navigate("/dashboard");
};`
    }
  },

  {
    id: "frontend-core",
    type: "custom",
    position: { x: 380, y: 280 },
    data: {
      title: "React Frontend Core",
      subtitle: "Vite + React + TypeScript App",
      category: "frontend",
      iconName: "Layout",
      techs: ["React 18", "TypeScript", "Vite", "React Router", "Tailwind CSS"],
      purpose: "Single-Page Application foundation providing responsive layout, client-side routing, and component state.",
      files: [
        { path: "frontend/src/App.tsx", desc: "Main router configuration (/login, /register, /dashboard, /workflows)" },
        { path: "frontend/src/main.tsx", desc: "Application bootstrap with AuthProvider context" },
        { path: "frontend/src/index.css", desc: "Global styles and Tailwind directives" }
      ],
      responsibilities: [
        "Client-side routing with React Router v6",
        "Modular component structure for workflows and task boards",
        "Theme styling and responsive grid management",
        "Global state propagation via Context API"
      ],
      codeSnippet: `<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/workflows" element={<Workflows />} />
    <Route path="/workflows/:workflowId" element={<WorkflowDetails />} />
  </Routes>
</BrowserRouter>`
    }
  },

  {
    id: "frontend-context",
    type: "custom",
    position: { x: 380, y: 520 },
    data: {
      title: "AuthContext & API Client",
      subtitle: "Global Auth State & Axios Interceptor",
      category: "frontend",
      iconName: "ShieldCheck",
      techs: ["React Context", "Axios Interceptors", "LocalStorage"],
      purpose: "Manages authenticated user state globally and injects Bearer tokens into outbound HTTP requests.",
      files: [
        { path: "frontend/src/context/AuthContext.tsx", desc: "Auth context provider & useAuth hook" },
        { path: "frontend/src/api/api.ts", desc: "Axios client with Bearer request interceptor" },
        { path: "frontend/src/api/auth.ts", desc: "Auth endpoint client methods (login, register, me)" }
      ],
      responsibilities: [
        "Automatically validates JWT token on app launch via /auth/me",
        "Attaches Authorization Bearer token to all Axios API requests",
        "Provides login, register, and logout helper functions across components",
        "Handles token invalidation and logout state resets"
      ],
      codeSnippet: `api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`
    }
  },

  {
    id: "frontend-dashboard-page",
    type: "custom",
    position: { x: 380, y: 760 },
    data: {
      title: "Dashboard & Workflow Views",
      subtitle: "Task Board & Analytical Metrics",
      category: "frontend",
      iconName: "BarChart3",
      techs: ["React", "TypeScript", "Lucide React", "Axios"],
      purpose: "Displays interactive statistics cards, workflow progress indicators, task filter board, and activity feeds.",
      files: [
        { path: "frontend/src/pages/Dashboard.tsx", desc: "Analytical dashboard overview & summary metrics" },
        { path: "frontend/src/pages/WorkflowsPage.tsx", desc: "List of user workflows with search/filter controls" },
        { path: "frontend/src/pages/WorkflowDetails.tsx", desc: "Kanban task board, task creation modal, progress stats" }
      ],
      responsibilities: [
        "Renders completion percentages and active task counters",
        "Provides task status toggling (TODO, IN_PROGRESS, COMPLETED)",
        "Allows priority filtering (Low, Medium, High) and search queries",
        "Displays real-time user activity log timeline"
      ],
      codeSnippet: `// Fetches dashboard statistics from backend
const data = await getDashboardStats();
setStats({
  totalWorkflows: data.total_workflows,
  completionRate: data.completion_percentage,
  overdueTasks: data.overdue_tasks
});`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 3: AUTHENTICATION & SECURITY (X = 710)
  // -------------------------------------------------------------
  {
    id: "auth-security-engine",
    type: "custom",
    position: { x: 710, y: 280 },
    data: {
      title: "Auth & Security Engine",
      subtitle: "Bcrypt & PyJWT Token Handler",
      category: "auth",
      iconName: "KeyRound",
      techs: ["Python", "PyJWT", "Passlib Bcrypt", "HTTPBearer"],
      purpose: "Secures API endpoints by generating/decoding HS256 JWT tokens and hashing user passwords securely using bcrypt.",
      files: [
        { path: "backend/app/security.py", desc: "Password hashing, verify_password, and JWT creation/decoding" }
      ],
      responsibilities: [
        "Hashes passwords using Passlib CryptContext (Bcrypt algorithm)",
        "Generates HS256 JWT access tokens with 60-minute expiration",
        "Decodes and verifies inbound JWT authorization signatures",
        "Enforces environment secret validation (SECRET_KEY)"
      ],
      codeSnippet: `pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 4: FASTAPI BACKEND ROUTERS (X = 1040)
  // -------------------------------------------------------------
  {
    id: "router-auth",
    type: "custom",
    position: { x: 1040, y: -60 },
    data: {
      title: "Auth Router (/auth)",
      subtitle: "User Auth Endpoints",
      category: "backend",
      iconName: "UserCheck",
      techs: ["FastAPI Router", "HTTPBearer", "SQLAlchemy"],
      purpose: "Exposes endpoints for user registration, user login, and authenticated current user retrieval.",
      files: [
        { path: "backend/app/routers/auth.py", desc: "/auth/register, /auth/login, /auth/me" }
      ],
      responsibilities: [
        "POST /auth/register: Creates user with hashed password",
        "POST /auth/login: Validates bcrypt password & returns JWT token",
        "GET /auth/me: Returns current authenticated user profile"
      ],
      codeSnippet: `@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(...)
    return {"access_token": create_access_token(...), "token_type": "bearer"}`
    }
  },

  {
    id: "router-dashboard",
    type: "custom",
    position: { x: 1040, y: 110 },
    data: {
      title: "Dashboard Router (/dashboard)",
      subtitle: "Analytics Aggregation",
      category: "backend",
      iconName: "PieChart",
      techs: ["FastAPI Router", "SQLAlchemy Joins"],
      purpose: "Aggregates workflow and task metrics for the authenticated user's dashboard view.",
      files: [
        { path: "backend/app/routers/dashboard.py", desc: "GET /dashboard returning summary metrics" }
      ],
      responsibilities: [
        "Counts total and active workflows per user",
        "Calculates task counts by status (todo, in_progress, completed)",
        "Computes completion percentage: (completed_tasks / total_tasks) * 100"
      ],
      codeSnippet: `completion_percentage = round((completed_tasks / total_tasks) * 100, 2) if total_tasks > 0 else 0.0`
    }
  },

  {
    id: "backend-core",
    type: "custom",
    position: { x: 1040, y: 280 },
    data: {
      title: "FastAPI Core Application",
      subtitle: "API Pipeline & Middleware",
      category: "backend",
      iconName: "Server",
      techs: ["FastAPI", "Uvicorn", "CORS Middleware"],
      purpose: "Main entry point of the backend API service, handling request routing, CORS headers, and health check endpoints.",
      files: [
        { path: "backend/app/main.py", desc: "FastAPI app initialization & CORS middleware" }
      ],
      responsibilities: [
        "Configures CORS middleware for frontend origins",
        "Registers routers (auth, workflows, tasks, activities, dashboard)",
        "Executes database table creation on app startup"
      ],
      codeSnippet: `app = FastAPI(title="FlowSync API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["..."], ...)`
    }
  },

  {
    id: "router-workflows",
    type: "custom",
    position: { x: 1040, y: 450 },
    data: {
      title: "Workflows Router (/workflows)",
      subtitle: "Workflow Management",
      category: "backend",
      iconName: "GitFork",
      techs: ["FastAPI Router", "SQLAlchemy ORM"],
      purpose: "Provides full CRUD operations for workflows and specific workflow progress statistics.",
      files: [
        { path: "backend/app/routers/workflows.py", desc: "POST, GET, PUT, DELETE /workflows" }
      ],
      responsibilities: [
        "POST /workflows/: Creates new workflow owned by current user",
        "GET /workflows/{id}/statistics: Returns task completion percentages"
      ],
      codeSnippet: `@router.post("/", response_model=WorkflowResponse)
def create_workflow(workflow: WorkflowCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ...`
    }
  },

  {
    id: "router-tasks",
    type: "custom",
    position: { x: 1040, y: 620 },
    data: {
      title: "Tasks Router (/tasks)",
      subtitle: "Task Execution & Search",
      category: "backend",
      iconName: "CheckSquare",
      techs: ["FastAPI Router", "SQLAlchemy Search"],
      purpose: "Handles task creation within workflows, updates, status changes, and priority filters.",
      files: [
        { path: "backend/app/routers/tasks.py", desc: "POST /workflows/{id}/tasks, GET/PUT/DELETE /tasks" }
      ],
      responsibilities: [
        "POST /workflows/{id}/tasks: Validates assigned_to user & workflow ownership",
        "PUT /tasks/{id}/status: Specialized status update endpoint"
      ],
      codeSnippet: `@task_router.put("/{task_id}/status", response_model=TaskResponse)
def update_task_status(task_id: int, status: TaskStatus, db: Session = Depends(get_db)):
    ...`
    }
  },

  {
    id: "router-activities",
    type: "custom",
    position: { x: 1040, y: 790 },
    data: {
      title: "Activities Router (/activities)",
      subtitle: "Audit Log Retrieval",
      category: "backend",
      iconName: "History",
      techs: ["FastAPI Router", "SQLAlchemy Ordering"],
      purpose: "Exposes activity log timeline for tracking historical user actions.",
      files: [
        { path: "backend/app/routers/activities.py", desc: "GET /activities with pagination" }
      ],
      responsibilities: [
        "Fetches recent activity logs for current authenticated user",
        "Orders activity records descending by creation timestamp"
      ],
      codeSnippet: `@router.get("/", response_model=list[ActivityResponse])
def get_activities(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    ...`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 5: BUSINESS LOGIC & SERVICES (X = 1370)
  // -------------------------------------------------------------
  {
    id: "services-metrics",
    type: "custom",
    position: { x: 1370, y: 150 },
    data: {
      title: "Productivity & Progress Math",
      subtitle: "Completion & Overdue Math",
      category: "services",
      iconName: "Calculator",
      techs: ["Python Math", "SQLAlchemy Query Filters"],
      purpose: "Calculates productivity metrics, overdue task deadlines, and completion percentages.",
      files: [
        { path: "backend/app/routers/dashboard.py", desc: "Completion percentage & overdue task query filters" }
      ],
      responsibilities: [
        "Computes completion rate: (completed_tasks / total_tasks) * 100",
        "Filters overdue tasks: due_date < current_utc_time AND status != 'completed'"
      ],
      codeSnippet: `overdue_tasks = db.query(Task).join(Workflow).filter(
    Workflow.owner_id == current_user.id,
    Task.due_date.isnot(None),
    Task.due_date < current_time,
    Task.status != "completed"
).count()`
    }
  },

  {
    id: "services-activity",
    type: "custom",
    position: { x: 1370, y: 280 },
    data: {
      title: "Activity Service",
      subtitle: "Audit Logging Service",
      category: "services",
      iconName: "Activity",
      techs: ["Python Service", "SQLAlchemy Session"],
      purpose: "Decoupled domain service that encapsulates activity log creation and database transaction commits.",
      files: [
        { path: "backend/app/services/activity.py", desc: "log_activity function implementation" }
      ],
      responsibilities: [
        "Instantiates Activity model with user_id, action name, and description",
        "Adds activity entity to SQLAlchemy Session and commits"
      ],
      codeSnippet: `def log_activity(db: Session, user_id: int, action: str, description: str):
    activity = Activity(user_id=user_id, action=action, description=description)
    db.add(activity)
    db.commit()`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 6: SQLALCHEMY ORM (X = 1700)
  // -------------------------------------------------------------
  {
    id: "orm-sqlalchemy-layer",
    type: "custom",
    position: { x: 1700, y: 280 },
    data: {
      title: "SQLAlchemy ORM & Schemas",
      subtitle: "DB Engine Pool & Schemas",
      category: "orm",
      iconName: "Layers",
      techs: ["SQLAlchemy 2.0", "DeclarativeBase", "Pydantic v2"],
      purpose: "Provides object-relational mapping, database session management, and Pydantic validation schemas.",
      files: [
        { path: "backend/app/database.py", desc: "Engine creation with pool_pre_ping=True" },
        { path: "backend/app/models.py", desc: "SQLAlchemy Mapped models" },
        { path: "backend/app/schemas.py", desc: "Pydantic v2 schemas" }
      ],
      responsibilities: [
        "Manages DB engine connection pool with pool_pre_ping=True",
        "Yields request-scoped SessionLocal sessions via get_db dependency",
        "Validates input payloads using Pydantic models"
      ],
      codeSnippet: `engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 7: POSTGRESQL DATABASE (X = 2030)
  // -------------------------------------------------------------
  {
    id: "database-postgresql",
    type: "custom",
    position: { x: 2030, y: 280 },
    data: {
      title: "PostgreSQL Database",
      subtitle: "Relational Storage Instance",
      category: "database",
      iconName: "Database",
      techs: ["PostgreSQL", "SQLAlchemy Engine", "Neon Cloud"],
      purpose: "Stores application entities reliably with transactional guarantees and relational integrity constraints.",
      files: [
        { path: "backend/app/database.py", desc: "DATABASE_URL environment binding" }
      ],
      responsibilities: [
        "Stores users, workflows, tasks, and activity logs",
        "Enforces unique constraints on user email addresses",
        "Executes cascading deletions when workflows or users are deleted"
      ],
      codeSnippet: `DATABASE_URL = os.getenv("DATABASE_URL")`
    }
  },

  {
    id: "db-table-users",
    type: "custom",
    position: { x: 2030, y: -40 },
    data: {
      title: "Users Table (users)",
      subtitle: "User Auth Profiles",
      category: "database",
      iconName: "Users",
      techs: ["PostgreSQL Table"],
      purpose: "Stores registered user profiles and bcrypt hashed passwords.",
      files: [{ path: "backend/app/models.py", desc: "User model definition" }],
      responsibilities: ["PK: id, name, email (Unique), hashed_password, created_at"],
      codeSnippet: `class User(Base): __tablename__ = "users"`
    }
  },

  {
    id: "db-table-workflows",
    type: "custom",
    position: { x: 2030, y: 140 },
    data: {
      title: "Workflows Table (workflows)",
      subtitle: "Workflow Containers",
      category: "database",
      iconName: "FolderGit2",
      techs: ["PostgreSQL Table"],
      purpose: "Stores workflow entities created by users.",
      files: [{ path: "backend/app/models.py", desc: "Workflow model definition" }],
      responsibilities: ["PK: id, name, description, status, owner_id (FK -> users.id)"],
      codeSnippet: `class Workflow(Base): __tablename__ = "workflows"`
    }
  },

  {
    id: "db-table-tasks",
    type: "custom",
    position: { x: 2030, y: 440 },
    data: {
      title: "Tasks Table (tasks)",
      subtitle: "Task Actionable Items",
      category: "database",
      iconName: "ListTodo",
      techs: ["PostgreSQL Table"],
      purpose: "Stores tasks associated with specific workflows and assigned users.",
      files: [{ path: "backend/app/models.py", desc: "Task model definition" }],
      responsibilities: ["PK: id, title, status, priority, due_date, workflow_id (FK), assigned_to (FK)"],
      codeSnippet: `class Task(Base): __tablename__ = "tasks"`
    }
  },

  {
    id: "db-table-activities",
    type: "custom",
    position: { x: 2030, y: 620 },
    data: {
      title: "Activities Table (activities)",
      subtitle: "System Audit Logs",
      category: "database",
      iconName: "FileText",
      techs: ["PostgreSQL Table"],
      purpose: "Persists activity log entries created whenever workflows or tasks are modified.",
      files: [{ path: "backend/app/models.py", desc: "Activity model definition" }],
      responsibilities: ["PK: id, action, description, user_id (FK -> users.id), created_at"],
      codeSnippet: `class Activity(Base): __tablename__ = "activities"`
    }
  }
];

export const INITIAL_EDGES = [
  // MAIN HORIZONTAL FLOW: User -> Frontend -> Auth Security -> Backend Core -> Services -> ORM -> PostgreSQL
  {
    id: "edge-user-frontend",
    source: "user-client",
    target: "frontend-core",
    animated: true,
    style: { stroke: "#38BDF8", strokeWidth: 2 },
    label: "HTTP Requests"
  },
  {
    id: "edge-frontend-auth",
    source: "frontend-core",
    target: "auth-security-engine",
    animated: true,
    style: { stroke: "#60A5FA", strokeWidth: 2 },
    label: "Bearer Token"
  },
  {
    id: "edge-auth-backend",
    source: "auth-security-engine",
    target: "backend-core",
    animated: true,
    style: { stroke: "#A78BFA", strokeWidth: 2 },
    label: "Verify Signature"
  },
  {
    id: "edge-backend-services",
    source: "backend-core",
    target: "services-activity",
    animated: true,
    style: { stroke: "#34D399", strokeWidth: 2 },
    label: "Dispatch Service"
  },
  {
    id: "edge-services-orm",
    source: "services-activity",
    target: "orm-sqlalchemy-layer",
    animated: true,
    style: { stroke: "#FBBF24", strokeWidth: 2 },
    label: "Commit Transaction"
  },
  {
    id: "edge-orm-postgresql",
    source: "orm-sqlalchemy-layer",
    target: "database-postgresql",
    animated: true,
    style: { stroke: "#2DD4BF", strokeWidth: 2 },
    label: "SQL Connection"
  },

  // FRONTEND BRANCHES
  {
    id: "edge-frontend-authpages",
    source: "frontend-core",
    target: "frontend-auth-pages",
    style: { stroke: "#60A5FA", strokeDasharray: "4 4" }
  },
  {
    id: "edge-frontend-context",
    source: "frontend-core",
    target: "frontend-context",
    style: { stroke: "#60A5FA", strokeDasharray: "4 4" }
  },
  {
    id: "edge-frontend-dashboard",
    source: "frontend-core",
    target: "frontend-dashboard-page",
    style: { stroke: "#60A5FA", strokeDasharray: "4 4" }
  },

  // ROUTER BRANCHES (Off Backend Core)
  {
    id: "edge-backend-router-auth",
    source: "backend-core",
    target: "router-auth",
    style: { stroke: "#34D399", strokeDasharray: "4 4" }
  },
  {
    id: "edge-backend-router-dashboard",
    source: "backend-core",
    target: "router-dashboard",
    style: { stroke: "#34D399", strokeDasharray: "4 4" }
  },
  {
    id: "edge-backend-router-workflows",
    source: "backend-core",
    target: "router-workflows",
    style: { stroke: "#34D399", strokeDasharray: "4 4" }
  },
  {
    id: "edge-backend-router-tasks",
    source: "backend-core",
    target: "router-tasks",
    style: { stroke: "#34D399", strokeDasharray: "4 4" }
  },
  {
    id: "edge-backend-router-activities",
    source: "backend-core",
    target: "router-activities",
    style: { stroke: "#34D399", strokeDasharray: "4 4" }
  },

  // BUSINESS LOGIC BRANCHES
  {
    id: "edge-services-metrics",
    source: "backend-core",
    target: "services-metrics",
    style: { stroke: "#FBBF24", strokeDasharray: "4 4" }
  },

  // DATABASE BRANCHES (Off PostgreSQL)
  {
    id: "edge-db-users",
    source: "database-postgresql",
    target: "db-table-users",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "edge-db-workflows",
    source: "database-postgresql",
    target: "db-table-workflows",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "edge-db-tasks",
    source: "database-postgresql",
    target: "db-table-tasks",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "edge-db-activities",
    source: "database-postgresql",
    target: "db-table-activities",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  }
];
