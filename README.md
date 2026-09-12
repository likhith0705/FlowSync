FlowSync

A full-stack workflow and task management application that helps users organize workflows, manage tasks, track progress, and monitor productivity.

Built with **React, TypeScript, FastAPI, SQLAlchemy, and JWT Authentication**.

---

Overview

FlowSync allows users to create and manage workflows and tasks through a modern dashboard.

Users can:

- Create and manage workflows
- Create, edit, and delete tasks
- Assign task priorities
- Set task due dates
- Track task status
- Monitor workflow progress
- View dashboard statistics
- Search and filter tasks
- Securely register and log in using JWT authentication

---

Features

1. Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- User-specific workflows and tasks

2. Dashboard

The dashboard provides an overview of user productivity, including:

- Total workflows
- Active workflows
- Total tasks
- To-do tasks
- Tasks in progress
- Completed tasks
- Overdue tasks
- Task completion percentage

3. Workflow Management

Users can:

- Create workflows
- View workflows
- Update workflow details
- Change workflow status
- Track workflow progress

Workflow statuses include:

- Active
- Completed
- Archived

3. Task Management

Users can:

- Create tasks
- Edit tasks
- Delete tasks
- Set task priorities
- Set due dates
- Update task status

Task statuses:

- To Do
- In Progress
- Completed

Task priorities:

- Low
- Medium
- High

4. Search and Filtering

Tasks can be searched and filtered by:

- Task name
- Task description
- Task status
- Task priority

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

---

# 📂 Project Structure

```text
FlowSync
│
├── backend
│   ├── app
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
│   ├── src
│   │   ├── api
│   │   ├── context
│   │   ├── pages
│   │   ├── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
