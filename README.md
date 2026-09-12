# 🚀 FlowSync

> A full-stack workflow and task management application designed to help users organize workflows, manage tasks, track progress, and monitor productivity.

[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue)]()
[![Python](https://img.shields.io/badge/Python-3.x-yellow)]()
[![Database](https://img.shields.io/badge/Database-SQLAlchemy-red)]()
[![Authentication](https://img.shields.io/badge/Auth-JWT-orange)]()

## 🌐 Live Demo

🚀 **Frontend:** https://flowsync-frontend-ecb8.onrender.com

⚡ **Backend API:** https://flowsync-h20s.onrender.com

📚 **API Documentation:** https://flowsync-h20s.onrender.com/docs


---

# 📌 Overview

FlowSync is a full-stack productivity application that allows users to create workflows, manage tasks, track progress, and monitor productivity through an interactive dashboard.

The application features secure JWT authentication and ensures that each user can only access their own workflows and tasks.

Users can:

- 📂 Create and manage workflows
- ✅ Create, update, and delete tasks
- 🎯 Assign task priorities
- 📅 Set task due dates
- 📊 Track workflow progress
- 📈 Monitor productivity statistics
- 🔍 Search and filter tasks
- 🔐 Securely register and log in using JWT authentication


---

# ✨ Features

## 🔐 Authentication

- User registration
- Secure user login
- JWT-based authentication
- Protected API routes
- Token-based session handling
- User-specific workflows and tasks

---

## 📊 Dashboard

The dashboard provides a real-time overview of user productivity.

Users can monitor:

- Total workflows
- Active workflows
- Total tasks
- To-do tasks
- Tasks in progress
- Completed tasks
- Overdue tasks
- Task completion percentage

---

## 📂 Workflow Management

Users can:

- Create workflows
- View workflows
- Update workflow details
- Change workflow status
- Track workflow progress
- Archive workflows

### Workflow Statuses

- 🟢 Active
- 🔵 Completed
- ⚪ Archived

---

## ✅ Task Management

Users can:

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks to workflows
- Set task priorities
- Set due dates
- Update task status

### Task Statuses

- 📋 To Do
- 🔄 In Progress
- ✅ Completed

### Task Priorities

- 🟢 Low
- 🟡 Medium
- 🔴 High

---

## 🔍 Search and Filtering

Tasks can be searched and filtered using:

- Task name
- Task description
- Task status
- Task priority

---

## 📈 Productivity Tracking

FlowSync automatically calculates workflow and task statistics to help users monitor their productivity.

This includes:

- Completed tasks
- Pending tasks
- Overdue tasks
- Workflow progress
- Task completion percentage


---

# 🛠️ Tech Stack

## 🎨 Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

## ⚙️ Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

## 🗄️ Database

- SQLAlchemy ORM
- PostgreSQL / Neon PostgreSQL

## ☁️ Deployment

- Frontend: Render Static Site
- Backend: Render Web Service
- Database: Neon PostgreSQL


---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │   TypeScript + Vite │
                    └──────────┬──────────┘
                               │
                               │ HTTP Requests
                               │ JWT Authentication
                               ▼
                    ┌─────────────────────┐
                    │     FastAPI API     │
                    │                     │
                    │  Authentication     │
                    │  Workflows          │
                    │  Tasks              │
                    │  Dashboard          │
                    │  Activities         │
                    └──────────┬──────────┘
                               │
                               │ SQLAlchemy ORM
                               ▼
                    ┌─────────────────────┐
                    │   PostgreSQL DB     │
                    │   Neon PostgreSQL   │
                    └─────────────────────┘
