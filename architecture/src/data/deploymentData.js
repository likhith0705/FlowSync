export const DEPLOYMENT_CATEGORIES = {
  client: {
    name: "User & Client Layer",
    color: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.25)",
    glowColor: "rgba(56, 189, 248, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    badgeText: "#7DD3FC"
  },
  frontendHost: {
    name: "Frontend Static Hosting",
    color: "#60A5FA",
    borderColor: "rgba(96, 165, 250, 0.25)",
    glowColor: "rgba(96, 165, 250, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(96, 165, 250, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeText: "#93C5FD"
  },
  securityGateway: {
    name: "CORS & Auth Gateway",
    color: "#A78BFA",
    borderColor: "rgba(167, 139, 250, 0.25)",
    glowColor: "rgba(167, 139, 250, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(167, 139, 250, 0.12)",
    badgeText: "#C4B5FD"
  },
  backendHost: {
    name: "Backend Web Service",
    color: "#34D399",
    borderColor: "rgba(52, 211, 153, 0.25)",
    glowColor: "rgba(52, 211, 153, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(52, 211, 153, 0.12)",
    badgeText: "#6EE7B7"
  },
  databaseCloud: {
    name: "Cloud Database Infrastructure",
    color: "#F87171",
    borderColor: "rgba(248, 113, 113, 0.25)",
    glowColor: "rgba(248, 113, 113, 0.1)",
    bgGradient: "linear-gradient(135deg, rgba(248, 113, 113, 0.08), rgba(21, 24, 31, 0.98))",
    badgeBg: "rgba(248, 113, 113, 0.12)",
    badgeText: "#FCA5A5"
  }
};

export const DEPLOYMENT_NODES = [
  // -------------------------------------------------------------
  // COLUMN 1: CLIENT BROWSER (X = 50)
  // -------------------------------------------------------------
  {
    id: "dep-user-browser",
    type: "custom",
    position: { x: 50, y: 220 },
    data: {
      title: "User Browser",
      subtitle: "Client Devices & Web Browsers",
      category: "client",
      iconName: "Globe",
      techs: ["Chrome / Firefox", "HTTPS", "JSON API"],
      purpose: "Renders the FlowSync React SPA and handles user interactions for workflow and task management.",
      files: [
        { path: "frontend/index.html", desc: "Root HTML entry document" },
        { path: "frontend/src/main.tsx", desc: "React root DOM mounting" }
      ],
      envVars: ["VITE_API_URL"],
      responsibilities: [
        "Fetches HTML, JavaScript, and asset bundles from Render Static Site",
        "Executes client-side React Router navigation",
        "Persists user JWT access_token in browser LocalStorage",
        "Dispatches HTTPS REST requests to Render Backend API"
      ],
      codeSnippet: `// Environment configuration in frontend/.env
VITE_API_URL=https://flowsync-h20s.onrender.com`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 2: FRONTEND HOSTING (X = 380)
  // -------------------------------------------------------------
  {
    id: "dep-render-frontend",
    type: "custom",
    position: { x: 380, y: 220 },
    data: {
      title: "Render Static Site",
      subtitle: "Frontend Production Hosting",
      category: "frontendHost",
      iconName: "Cloud",
      techs: ["Render Platform", "Vite Build", "CDN Distribution"],
      purpose: "Serves compiled React static assets globally via Render's high-speed CDN infrastructure.",
      files: [
        { path: "frontend/vite.config.ts", desc: "Vite build configuration" },
        { path: "frontend/package.json", desc: "Build scripts (vite build)" }
      ],
      envVars: ["VITE_API_URL=https://flowsync-h20s.onrender.com"],
      responsibilities: [
        "Automated continuous deployment from GitHub main branch",
        "Compiles TypeScript and bundles React code using Vite",
        "Serves SPA with global CDN caching and SSL/TLS HTTPS encryption",
        "Live URL: https://flowsync-frontend-ecb8.onrender.com"
      ],
      codeSnippet: `// Production Live URL
https://flowsync-frontend-ecb8.onrender.com`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 3: CORS & SECURITY GATEWAY (X = 710)
  // -------------------------------------------------------------
  {
    id: "dep-cors-gateway",
    type: "custom",
    position: { x: 710, y: 220 },
    data: {
      title: "CORS & HTTPS Security",
      subtitle: "Cross-Origin & Bearer Middleware",
      category: "securityGateway",
      iconName: "ShieldAlert",
      techs: ["FastAPI Middleware", "HTTPS TLS", "CORS Allowed Origins"],
      purpose: "Filters inbound API traffic, enforces TLS encryption, and permits cross-origin requests from the Render frontend.",
      files: [
        { path: "backend/app/main.py", desc: "CORSMiddleware configuration (lines 18-27)" }
      ],
      envVars: ["SECRET_KEY"],
      responsibilities: [
        "Allows origins: https://flowsync-frontend-ecb8.onrender.com and http://localhost:5173",
        "Enforces HTTPBearer authorization token validation on protected routes",
        "Blocks unauthorized cross-origin preflight requests",
        "Guarantees secure HTTPS transmission between frontend and backend"
      ],
      codeSnippet: `app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://flowsync-frontend-ecb8.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 4: BACKEND APPLICATION HOSTING (X = 1040)
  // -------------------------------------------------------------
  {
    id: "dep-render-backend",
    type: "custom",
    position: { x: 1040, y: 220 },
    data: {
      title: "Render Web Service",
      subtitle: "FastAPI Backend API Host",
      category: "backendHost",
      iconName: "Server",
      techs: ["Render Web Service", "Python 3.x", "Uvicorn ASGI"],
      purpose: "Executes Python FastAPI web backend server handling REST API endpoints, business logic, and DB transactions.",
      files: [
        { path: "backend/app/main.py", desc: "FastAPI application entry point" },
        { path: "backend/requirements.txt", desc: "Production Python dependencies" }
      ],
      envVars: ["DATABASE_URL", "SECRET_KEY"],
      responsibilities: [
        "Runs Uvicorn ASGI server hosting FastAPI REST endpoints",
        "Handles user authentication, dashboard analytics, and CRUD operations",
        "Manages database connection sessions using SQLAlchemy SessionLocal",
        "Live URL: https://flowsync-h20s.onrender.com"
      ],
      codeSnippet: `// Production API Documentation URL
https://flowsync-h20s.onrender.com/docs`
    }
  },

  {
    id: "dep-auth-bcrypt",
    type: "custom",
    position: { x: 1040, y: 460 },
    data: {
      title: "Bcrypt & JWT Security Engine",
      subtitle: "Password Cryptography & Token Signer",
      category: "securityGateway",
      iconName: "Key",
      techs: ["Passlib Bcrypt", "PyJWT HS256", "HTTPBearer"],
      purpose: "Hashes raw user passwords using bcrypt and encodes/decodes 60-minute expiration JWT tokens.",
      files: [
        { path: "backend/app/security.py", desc: "Password hashing & JWT encoding logic" }
      ],
      envVars: ["SECRET_KEY"],
      responsibilities: [
        "Uses bcrypt algorithm via Passlib CryptContext",
        "Encodes payload with user sub ID and 60-minute expiry timestamp",
        "Verifies JWT signature against production SECRET_KEY"
      ],
      codeSnippet: `pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 5: SQLALCHEMY ORM & POOL (X = 1370)
  // -------------------------------------------------------------
  {
    id: "dep-orm-pool",
    type: "custom",
    position: { x: 1370, y: 220 },
    data: {
      title: "SQLAlchemy Pool & SSL",
      subtitle: "Pre-Ping Connection Manager",
      category: "backendHost",
      iconName: "Workflow",
      techs: ["SQLAlchemy 2.0", "pool_pre_ping", "psycopg2 / asyncpg"],
      purpose: "Manages database connection pool with automatic pre-ping health checks and SSL channel binding.",
      files: [
        { path: "backend/app/database.py", desc: "create_engine with pool_pre_ping=True" }
      ],
      envVars: ["DATABASE_URL"],
      responsibilities: [
        "Executes pool_pre_ping=True to discard stale database connections",
        "Yields scoped database session per HTTP request via get_db",
        "Enforces SSL encryption mode (sslmode=require) for cloud DB"
      ],
      codeSnippet: `engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)`
    }
  },

  // -------------------------------------------------------------
  // COLUMN 6: CLOUD DATABASE INFRASTRUCTURE (X = 1700)
  // -------------------------------------------------------------
  {
    id: "dep-neon-postgres",
    type: "custom",
    position: { x: 1700, y: 220 },
    data: {
      title: "Neon PostgreSQL Cloud DB",
      subtitle: "Serverless PostgreSQL Instance",
      category: "databaseCloud",
      iconName: "Database",
      techs: ["Neon PostgreSQL", "AWS us-east-2", "SSL Required"],
      purpose: "Managed serverless PostgreSQL database cloud service providing high-availability storage and backups.",
      files: [
        { path: "backend/.env", desc: "Neon Cloud DATABASE_URL binding" },
        { path: "backend/app/models.py", desc: "Database relational models" }
      ],
      envVars: ["DATABASE_URL=postgresql://neondb_owner:...@ep-sparkling-hill...aws.neon.tech/neondb"],
      responsibilities: [
        "Hosts relational data tables: users, workflows, tasks, activities",
        "Provides serverless auto-scaling database computes on AWS us-east-2",
        "Enforces foreign key relationships, unique email constraints, and cascade deletions"
      ],
      codeSnippet: `DATABASE_URL=postgresql://neondb_owner:...@ep-sparkling-hill-a503gumh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
    }
  },

  {
    id: "dep-table-users",
    type: "custom",
    position: { x: 1700, y: -20 },
    data: {
      title: "Users Table (users)",
      subtitle: "User Credentials & Auth Profiles",
      category: "databaseCloud",
      iconName: "Users",
      techs: ["PostgreSQL Table", "Bcrypt Passwords"],
      purpose: "Persists user identities, emails, and bcrypt hashed passwords.",
      files: [{ path: "backend/app/models.py", desc: "User entity definition" }],
      envVars: [],
      responsibilities: ["Unique email constraint", "Cascade delete-orphan to workflows"],
      codeSnippet: `__tablename__ = "users"`
    }
  },

  {
    id: "dep-table-workflows",
    type: "custom",
    position: { x: 1700, y: 440 },
    data: {
      title: "Workflows Table (workflows)",
      subtitle: "Workflow Containers",
      category: "databaseCloud",
      iconName: "FolderGit2",
      techs: ["PostgreSQL Table", "Foreign Key"],
      purpose: "Persists workflow records owned by specific users.",
      files: [{ path: "backend/app/models.py", desc: "Workflow entity definition" }],
      envVars: [],
      responsibilities: ["FK -> users.id", "Cascade delete-orphan to tasks"],
      codeSnippet: `__tablename__ = "workflows"`
    }
  },

  {
    id: "dep-table-tasks",
    type: "custom",
    position: { x: 1700, y: 620 },
    data: {
      title: "Tasks Table (tasks)",
      subtitle: "Task Execution Data",
      category: "databaseCloud",
      iconName: "ListTodo",
      techs: ["PostgreSQL Table", "Foreign Keys"],
      purpose: "Persists individual tasks with priority, status, and due dates.",
      files: [{ path: "backend/app/models.py", desc: "Task entity definition" }],
      envVars: [],
      responsibilities: ["FK -> workflows.id", "FK -> users.id (assigned_to)"],
      codeSnippet: `__tablename__ = "tasks"`
    }
  },

  {
    id: "dep-table-activities",
    type: "custom",
    position: { x: 1700, y: 800 },
    data: {
      title: "Activities Table (activities)",
      subtitle: "Audit Log Records",
      category: "databaseCloud",
      iconName: "FileText",
      techs: ["PostgreSQL Table", "Audit Timeline"],
      purpose: "Persists historical user activity log records.",
      files: [{ path: "backend/app/models.py", desc: "Activity entity definition" }],
      envVars: [],
      responsibilities: ["FK -> users.id", "Timestamp ordering"],
      codeSnippet: `__tablename__ = "activities"`
    }
  }
];

export const DEPLOYMENT_EDGES = [
  {
    id: "dep-edge-browser-frontend",
    source: "dep-user-browser",
    target: "dep-render-frontend",
    animated: true,
    style: { stroke: "#38BDF8", strokeWidth: 2 },
    label: "HTTPS GET Static Bundle"
  },
  {
    id: "dep-edge-browser-security",
    source: "dep-user-browser",
    target: "dep-cors-gateway",
    animated: true,
    style: { stroke: "#60A5FA", strokeWidth: 2 },
    label: "HTTPS REST API Requests"
  },
  {
    id: "dep-edge-security-backend",
    source: "dep-cors-gateway",
    target: "dep-render-backend",
    animated: true,
    style: { stroke: "#A78BFA", strokeWidth: 2 },
    label: "CORS Allowed & Bearer Validated"
  },
  {
    id: "dep-edge-backend-auth",
    source: "dep-render-backend",
    target: "dep-auth-bcrypt",
    style: { stroke: "#34D399", strokeDasharray: "4 4" },
    label: "Bcrypt & Token Verification"
  },
  {
    id: "dep-edge-backend-orm",
    source: "dep-render-backend",
    target: "dep-orm-pool",
    animated: true,
    style: { stroke: "#34D399", strokeWidth: 2 },
    label: "SQLAlchemy Session Transaction"
  },
  {
    id: "dep-edge-orm-neon",
    source: "dep-orm-pool",
    target: "dep-neon-postgres",
    animated: true,
    style: { stroke: "#34D399", strokeWidth: 2 },
    label: "SSL Encrypted Connection (AWS us-east-2)"
  },
  {
    id: "dep-edge-neon-users",
    source: "dep-neon-postgres",
    target: "dep-table-users",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "dep-edge-neon-workflows",
    source: "dep-neon-postgres",
    target: "dep-table-workflows",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "dep-edge-neon-tasks",
    source: "dep-neon-postgres",
    target: "dep-table-tasks",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  },
  {
    id: "dep-edge-neon-activities",
    source: "dep-neon-postgres",
    target: "dep-table-activities",
    style: { stroke: "#F87171", strokeDasharray: "4 4" }
  }
];
