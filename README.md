# ⚡ FlowSync

### Full-Stack Workflow & Task Management System

FlowSync is a full-stack workflow and task management application designed to help users organize workflows, manage tasks, track progress, and monitor productivity through a modern and intuitive dashboard.

The application provides secure user authentication, workflow and task management, productivity analytics, activity tracking, search and filtering, and real-time progress calculations.

Built with **React, TypeScript, FastAPI, PostgreSQL, SQLAlchemy, and JWT Authentication**.

---

## 🌐 Interactive Architecture

Explore the complete interactive architecture of FlowSync:

### 🔗 [View FlowSync Interactive Architecture](https://likhith0705.github.io/FlowSync/)

The architecture visualization provides an interactive view of:

- Frontend architecture
- Authentication and security flow
- FastAPI API routers
- Business logic and services
- SQLAlchemy ORM layer
- PostgreSQL database structure
- Deployment architecture
- Component relationships and data flow

Click on architecture nodes to explore their responsibilities, technologies, and source mappings.

---

# 📋 Overview

FlowSync allows authenticated users to manage their workflows and tasks from a centralized dashboard.

Users can:

- Create and manage workflows
- Create, edit, and delete tasks
- Assign task priorities
- Set task due dates
- Update task statuses
- Track workflow completion
- Monitor productivity statistics
- View overdue tasks
- Search and filter tasks
- Track application activity
- Securely register and log in using JWT authentication

The application follows a modern full-stack architecture with a React frontend communicating with a FastAPI REST API backed by PostgreSQL.

---

# ✨ Features

## 🔐 Authentication & Security

FlowSync provides secure authentication and user isolation.

Features include:

- User registration
- User login
- Password hashing using `bcrypt`
- JWT-based authentication
- Bearer token authentication
- Protected API routes
- User-specific data access
- Secure authentication state management

Authentication ensures that users can only access their own workflows, tasks, and activities.

---

## 📊 Dashboard

The dashboard provides a high-level overview of user productivity.

Users can monitor:

- Total workflows
- Active workflows
- Total tasks
- To-do tasks
- Tasks in progress
- Completed tasks
- Overdue tasks
- Task completion percentage

Task completion is calculated based on completed tasks relative to the total number of tasks.

```text
Completion Percentage =
(completed_tasks / total_tasks) × 100
```

---

## 🔄 Workflow Management

Users can organize their work using workflows.

Features include:

- Create workflows
- View workflows
- Update workflow details
- Change workflow status
- Track workflow progress
- Associate tasks with workflows

### Workflow Statuses

- 🟢 Active
- ✅ Completed
- 📦 Archived

Workflow progress is automatically derived from task completion.

---

## ✅ Task Management

FlowSync provides complete task lifecycle management.

Users can:

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks to workflows
- Set task priorities
- Set due dates
- Update task statuses
- Monitor overdue tasks

### Task Statuses

- To Do
- In Progress
- Completed

### Task Priorities

- 🟢 Low
- 🟡 Medium
- 🔴 High

---

## 🔎 Search & Filtering

Tasks can be searched and filtered to help users quickly find relevant work.

Filtering supports:

- Task name
- Task description
- Task status
- Task priority

This allows users to efficiently manage larger collections of tasks.

---

## 📈 Productivity Tracking

FlowSync calculates productivity-related statistics based on user workflows and tasks.

The system tracks:

- Task completion
- Workflow progress
- Active work
- Completed work
- Overdue tasks

These metrics are exposed through the dashboard API and displayed in the frontend.

---

## 📝 Activity Tracking

The application includes an activity logging system.

Important user actions can be recorded through a dedicated activity service.

The backend includes:

```text
Activity Service
    ↓
Activity Logging
    ↓
Activities Table
```

This helps maintain a record of relevant application events.

---

# 🏗️ System Architecture

FlowSync follows a layered full-stack architecture.

```text
                    ┌──────────────────┐
                    │   User / Client  │
                    └────────┬─────────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │     React Frontend       │
              │ React + TypeScript + Vite│
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │   Authentication Layer   │
              │ JWT + Bearer Tokens      │
              │ bcrypt Password Hashing  │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │     FastAPI Backend      │
              │       REST API           │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │   Business Logic Layer   │
              │ Progress & Activity Logic│
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │      SQLAlchemy ORM      │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │       PostgreSQL         │
              │ Users • Workflows        │
              │ Tasks • Activities       │
              └──────────────────────────┘
```

---

# 🧠 Interactive Architecture Visualization

FlowSync includes a dedicated interactive architecture explorer built using React and React Flow.

### Explore it here:

👉 **[https://likhith0705.github.io/FlowSync/](https://likhith0705.github.io/FlowSync/)**

The visualization allows visitors to:

- Explore the complete system architecture
- Navigate the architecture canvas
- Zoom and pan through components
- Inspect frontend components
- Explore backend API routers
- Understand authentication flow
- View business logic relationships
- Inspect database entities
- Explore PostgreSQL tables
- View deployment architecture

The architecture visualization is deployed using **GitHub Pages**.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe frontend development |
| Vite | Frontend development and build tooling |
| React Router | Client-side routing |
| Axios | API communication |
| Tailwind CSS | UI styling |
| Lucide React | Icons |

---

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | REST API framework |
| SQLAlchemy | ORM and database interaction |
| Pydantic | Request and response validation |
| Passlib | Password hashing utilities |
| bcrypt | Secure password hashing |
| JWT | Authentication tokens |
| HTTPBearer | Bearer token authentication |

---

## Database

| Technology | Purpose |
|---|---|
| PostgreSQL | Relational database |
| SQLAlchemy | ORM layer |

---

## Architecture Visualization

| Technology | Purpose |
|---|---|
| React | Architecture interface |
| Vite | Development and production build |
| React Flow | Interactive architecture canvas |
| Lucide React | Icons |
| GitHub Pages | Deployment |

---

# 📂 Project Structure

```text
FlowSync
│
├── backend
│   │
│   ├── app
│   │   │
│   │   ├── routers
│   │   │   ├── activities.py
│   │   │   ├── auth.py
│   │   │   ├── dashboard.py
│   │   │   ├── tasks.py
│   │   │   └── workflows.py
│   │   │
│   │   ├── services
│   │   │   └── activity.py
│   │   │
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── security.py
│   │
│   └── requirements.txt
│
├── frontend
│   │
│   ├── src
│   │   │
│   │   ├── api
│   │   ├── context
│   │   ├── pages
│   │   ├── types
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── architecture
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   ├── CustomNode.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Legend.jsx
│   │   │   └── NodeDetailModal.jsx
│   │   │
│   │   ├── data
│   │   │   ├── architectureData.js
│   │   │   └── deploymentData.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .github
│   └── workflows
│       └── deploy-pages.yml
│
└── README.md
```

---

# 🔐 Authentication Architecture

FlowSync uses JWT-based authentication.

```text
User
 │
 │ Login / Register
 ▼
React Frontend
 │
 │ Authentication Request
 ▼
FastAPI
 │
 │ Validate Credentials
 ▼
Security Layer
 │
 ├── Password Hashing
 │       │
 │       └── bcrypt
 │
 └── JWT Generation
         │
         ▼
      JWT Token
         │
         ▼
Frontend Storage
         │
         ▼
Axios Request
         │
         │ Authorization: Bearer <token>
         ▼
Protected FastAPI Routes
```

---

# 🌐 Frontend Architecture

The frontend is built using React and TypeScript.

The main frontend responsibilities include:

```text
React Application
│
├── Authentication Pages
│
├── Dashboard
│   ├── Productivity Statistics
│   ├── Workflow Metrics
│   └── Task Metrics
│
├── Workflow Management
│   ├── Create Workflow
│   ├── Update Workflow
│   └── Workflow Status
│
├── Task Management
│   ├── Create Task
│   ├── Update Task
│   ├── Delete Task
│   ├── Search
│   └── Filter
│
├── AuthContext
│
└── Axios API Client
```

The frontend communicates with the backend through REST API requests.

---

# ⚙️ Backend Architecture

The backend is built using FastAPI.

API functionality is organized into routers.

```text
FastAPI Application
│
├── auth.py
│   ├── User Registration
│   ├── User Login
│   └── JWT Authentication
│
├── dashboard.py
│   └── Productivity Statistics
│
├── workflows.py
│   ├── Create Workflow
│   ├── Update Workflow
│   └── Workflow Progress
│
├── tasks.py
│   ├── Create Task
│   ├── Update Task
│   ├── Delete Task
│   └── Search / Filtering
│
└── activities.py
    └── Activity Retrieval
```

---

# 🧩 API Routers

## 🔐 Authentication Router

Responsible for:

- User registration
- User login
- Password validation
- Password hashing
- JWT generation
- Authentication validation

---

## 📊 Dashboard Router

Responsible for calculating and returning:

- Workflow statistics
- Task statistics
- Completed tasks
- Active tasks
- Overdue tasks
- Completion percentage

---

## 🔄 Workflows Router

Responsible for:

- Creating workflows
- Retrieving workflows
- Updating workflows
- Managing workflow statuses
- Calculating workflow progress

---

## ✅ Tasks Router

Responsible for:

- Creating tasks
- Updating tasks
- Deleting tasks
- Updating task status
- Assigning priorities
- Managing due dates
- Searching tasks
- Filtering tasks

---

## 📝 Activities Router

Responsible for retrieving user activity information.

Activity creation and logging logic is handled through the activity service.

---

# 🗄️ Database Architecture

FlowSync uses PostgreSQL as its relational database.

The application includes the following core entities:

```text
Users
 │
 ├───────────────┐
 │               │
 ▼               ▼
Workflows     Activities
 │
 ▼
Tasks
```

---

## 👤 Users

Stores application users.

A user can own:

- Multiple workflows
- Multiple tasks
- Multiple activity records

---

## 🔄 Workflows

Represents a collection of related tasks.

A workflow includes information such as:

- Workflow details
- Status
- Associated tasks
- Progress

---

## ✅ Tasks

Represents individual work items.

Tasks include:

- Task name
- Description
- Status
- Priority
- Due date
- Associated workflow

---

## 📝 Activities

Stores application activity information.

Activities are created through the dedicated activity logging service.

---

# 🔁 Data Flow

A typical request flows through the system as follows:

```text
User
 │
 ▼
React Component
 │
 ▼
Axios API Client
 │
 ▼
FastAPI Endpoint
 │
 ▼
Authentication Validation
 │
 ▼
Business Logic
 │
 ▼
SQLAlchemy ORM
 │
 ▼
PostgreSQL Database
 │
 ▼
SQLAlchemy Response
 │
 ▼
FastAPI Response
 │
 ▼
React UI Update
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Python
- Node.js
- npm
- PostgreSQL

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your PostgreSQL database connection.

Then start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend should start on a local development server.

---

# 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 🧠 Architecture Visualization Setup

The interactive architecture visualization is located in:

```text
architecture/
```

Navigate to the directory:

```bash
cd architecture
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

---

# ☁️ Deployment Architecture

FlowSync consists of multiple layers that can be deployed independently.

```text
                     ┌─────────────────────┐
                     │      User Browser   │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   React Frontend    │
                     │      Vite Build     │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │    FastAPI API      │
                     │     Backend Service │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │     PostgreSQL      │
                     │      Database       │
                     └─────────────────────┘
```

The project also includes a dedicated GitHub Pages deployment for the interactive architecture visualization.

---

# 📦 GitHub Pages Deployment

The interactive architecture is automatically deployed using GitHub Actions.

The deployment workflow:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Install Dependencies
   │
   ├── Build Architecture
   │
   └── Deploy to GitHub Pages
            │
            ▼
   https://likhith0705.github.io/FlowSync/
```

The deployment workflow is defined in:

```text
.github/workflows/deploy-pages.yml
```

---

# 🧪 Key Implementation Details

## Password Security

Passwords are securely hashed using:

```text
Passlib
   +
bcrypt
```

Passwords are not stored in plain text.

---

## JWT Authentication

Protected routes use Bearer token authentication.

```text
Authorization: Bearer <JWT_TOKEN>
```

The backend validates tokens before allowing access to protected resources.

---

## User Data Isolation

FlowSync ensures that users only access their own data.

This applies to:

- Workflows
- Tasks
- Activities
- Dashboard statistics

---

## Workflow Progress

Workflow progress is calculated using the completion state of associated tasks.

```text
Workflow
    │
    ├── Task 1 ✅
    ├── Task 2 ✅
    ├── Task 3 ⏳
    └── Task 4 ⏳

Progress = 50%
```

---

## Dashboard Analytics

Dashboard statistics are calculated from user data.

Examples include:

```text
Total Tasks

Completed Tasks

In Progress Tasks

To Do Tasks

Overdue Tasks

Completion Percentage
```

---

# 🎯 Project Highlights

- ⚡ Full-stack architecture
- 🔐 JWT authentication
- 🔒 bcrypt password hashing
- 👤 User-specific data isolation
- 📊 Productivity dashboard
- 🔄 Workflow management
- ✅ Complete task lifecycle management
- 🔎 Task search and filtering
- 📝 Activity tracking
- 🗄️ PostgreSQL database
- 🔗 RESTful API architecture
- 🧩 SQLAlchemy ORM
- 🎨 Modern React frontend
- 🏗️ Interactive architecture visualization
- ☁️ GitHub Pages deployment
- 🚀 GitHub Actions CI/CD

---

# 🗺️ Future Improvements

Possible future enhancements include:

- Task categories
- Task labels
- Workflow collaboration
- Team workspaces
- Task comments
- File attachments
- Email notifications
- Real-time updates
- Calendar integration
- Drag-and-drop task boards
- Advanced analytics
- Recurring tasks
- Dark/light theme switching
- Mobile application

---

# 📸 Interactive Architecture

Explore the project architecture directly in your browser:

## 👉 [FlowSync Interactive Architecture](https://likhith0705.github.io/FlowSync/)

The visualization provides an interactive representation of the complete FlowSync system.

You can explore:

```text
User
  ↓
React Frontend
  ↓
Authentication
  ↓
FastAPI Backend
  ↓
Business Logic
  ↓
SQLAlchemy ORM
  ↓
PostgreSQL
```

It also includes a dedicated deployment architecture view.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 👨‍💻 Author

**Likhith M**

GitHub:  
[https://github.com/likhith0705](https://github.com/likhith0705)

Project Repository:  
[https://github.com/likhith0705/FlowSync](https://github.com/likhith0705/FlowSync)

---

# ⭐ Support

If you found this project interesting or useful, consider giving the repository a ⭐.

It helps support the project and motivates further development.

---

<div align="center">

### ⚡ FlowSync

**Organize Workflows. Manage Tasks. Track Progress.**

Built with ❤️ using  
**React • TypeScript • FastAPI • Python • SQLAlchemy • PostgreSQL • JWT**

<br/>

### 🏗️ [Explore the Interactive Architecture →](https://likhith0705.github.io/FlowSync/)

</div>
