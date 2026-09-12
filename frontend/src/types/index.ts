// =========================
// USER
// =========================

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}


// =========================
// AUTHENTICATION
// =========================

export interface LoginData {
  email: string;
  password: string;
}


export interface RegisterData {
  name: string;
  email: string;
  password: string;
}


export interface TokenResponse {
  access_token: string;
  token_type: string;
}


// =========================
// WORKFLOW
// =========================

export interface Workflow {
  id: number;
  name: string;
  description: string | null;
  status: string;
  owner_id: number;
  created_at: string;
}


export interface WorkflowCreate {
  name: string;
  description?: string;
}


// =========================
// TASK
// =========================

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  workflow_id: number;
  assigned_to: number | null;
  created_at: string;
}


export interface TaskCreate {
  title: string;
  description?: string;
  priority?: string;
  due_date?: string;
  assigned_to?: number;
}


// =========================
// DASHBOARD
// =========================

export interface DashboardData {
  total_workflows: number;
  active_workflows: number;

  total_tasks: number;
  todo_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;

  completion_percentage: number;
}