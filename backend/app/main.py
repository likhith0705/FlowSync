from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import Base, engine
from app.routers import auth, workflows, tasks, activities, dashboard


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="FlowSync API",
    description="A workflow and task management system",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://flowsync-frontend-ecb8.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth.router)
app.include_router(workflows.router)
app.include_router(tasks.router)
app.include_router(tasks.task_router)
app.include_router(activities.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to FlowSync API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }