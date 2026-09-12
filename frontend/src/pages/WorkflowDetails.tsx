import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Clock,
  Edit3,
  ListTodo,
  Plus,
  Save,
  Trash2,
  Workflow,
  X,
} from "lucide-react";

import api from "../api/client";


interface WorkflowData {
  id: number;
  name: string;
  description: string | null;
  status: string;
  owner_id: number;
  created_at: string;
}


interface Task {
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


function WorkflowDetails() {

  const { workflowId } = useParams();

  const navigate = useNavigate();


  // =========================
  // MAIN STATE
  // =========================

  const [workflow, setWorkflow] =
    useState<WorkflowData | null>(null);

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // CREATE TASK STATE
  // =========================

  const [taskTitle, setTaskTitle] =
    useState("");

  const [taskDescription, setTaskDescription] =
    useState("");

  const [taskPriority, setTaskPriority] =
    useState("medium");

  const [taskDueDate, setTaskDueDate] =
    useState("");

  const [taskError, setTaskError] =
    useState("");

  const [creatingTask, setCreatingTask] =
    useState(false);


  // =========================
  // EDIT TASK STATE
  // =========================

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editPriority, setEditPriority] =
    useState("medium");

  const [editDueDate, setEditDueDate] =
    useState("");

  const [savingTask, setSavingTask] =
    useState(false);


    // =========================
// WORKFLOW STATUS STATE
// =========================

const [updatingWorkflowStatus, setUpdatingWorkflowStatus] =
  useState(false);


    // =========================
// SEARCH + FILTER STATE
// =========================

const [searchQuery, setSearchQuery] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("all");

const [priorityFilter, setPriorityFilter] =
  useState("all");


  // =========================
  // FETCH WORKFLOW
  // =========================

  const fetchWorkflowDetails = async () => {

    try {

      setLoading(true);

      setError("");


      const workflowResponse =
        await api.get(
          `/workflows/${workflowId}`
        );


      const tasksResponse =
        await api.get(
          `/workflows/${workflowId}/tasks`
        );


      setWorkflow(
        workflowResponse.data
      );


      setTasks(
        tasksResponse.data.tasks
      );


    } catch (error) {

      console.error(error);

      setError(
        "Failed to load workflow details."
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchWorkflowDetails();

  }, [workflowId]);


  // =========================
  // CREATE TASK
  // =========================

  const handleCreateTask = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    if (!taskTitle.trim()) {

      setTaskError(
        "Task title is required."
      );

      return;

    }


    try {

      setCreatingTask(true);

      setTaskError("");


      const response =
        await api.post(

          `/workflows/${workflowId}/tasks`,

          {

            title:
              taskTitle.trim(),

            description:
              taskDescription.trim()
                ? taskDescription.trim()
                : null,

            priority:
              taskPriority,

            due_date:
              taskDueDate
                ? new Date(
                    taskDueDate
                  ).toISOString()
                : null,

          }

        );


      // Add task immediately

      setTasks(
        (previousTasks) => [

          ...previousTasks,

          response.data,

        ]
      );


      // Reset form

      setTaskTitle("");

      setTaskDescription("");

      setTaskPriority("medium");

      setTaskDueDate("");


    } catch (error) {

      console.error(error);

      setTaskError(
        "Failed to create task."
      );


    } finally {

      setCreatingTask(false);

    }

  };


  // =========================
  // UPDATE TASK STATUS
  // =========================

  const handleStatusChange = async (

    taskId: number,

    newStatus: string

  ) => {

    try {

      const response =
        await api.put(

          `/tasks/${taskId}`,

          {

            status:
              newStatus,

          }

        );


      setTasks(

        (previousTasks) =>

          previousTasks.map(

            (task) =>

              task.id === taskId

                ? response.data

                : task

          )

      );


    } catch (error) {

      console.error(error);

      alert(
        "Failed to update task status."
      );

    }

  };


  // =========================
  // START EDITING
  // =========================

  const handleEditTask = (
    task: Task
  ) => {

    setEditingTaskId(
      task.id
    );


    setEditTitle(
      task.title
    );


    setEditDescription(
      task.description || ""
    );


    setEditPriority(
      task.priority
    );


    if (task.due_date) {

      const date =
        new Date(
          task.due_date
        );


      const localDate =
        new Date(

          date.getTime() -

          date.getTimezoneOffset()
            * 60000

        )

          .toISOString()

          .slice(0, 16);


      setEditDueDate(
        localDate
      );


    } else {

      setEditDueDate("");

    }

  };


  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingTaskId(null);

    setEditTitle("");

    setEditDescription("");

    setEditPriority("medium");

    setEditDueDate("");

  };


  // =========================
  // SAVE TASK
  // =========================

  const handleSaveTask = async (
    taskId: number
  ) => {

    if (!editTitle.trim()) {

      alert(
        "Task title is required."
      );

      return;

    }


    try {

      setSavingTask(true);


      const response =
        await api.put(

          `/tasks/${taskId}`,

          {

            title:
              editTitle.trim(),

            description:
              editDescription.trim()
                ? editDescription.trim()
                : null,

            priority:
              editPriority,

            due_date:
              editDueDate
                ? new Date(
                    editDueDate
                  ).toISOString()
                : null,

          }

        );


      setTasks(

        (previousTasks) =>

          previousTasks.map(

            (task) =>

              task.id === taskId

                ? response.data

                : task

          )

      );


      handleCancelEdit();


    } catch (error) {

      console.error(error);

      alert(
        "Failed to update task."
      );


    } finally {

      setSavingTask(false);

    }

  };



  // =========================
// UPDATE WORKFLOW STATUS
// =========================

const handleWorkflowStatusChange = async (
  newStatus: string
) => {

  if (!workflow) {
    return;
  }

  try {

    setUpdatingWorkflowStatus(true);

    const response =
      await api.put(
        `/workflows/${workflowId}`,
        {
          status: newStatus,
        }
      );

    setWorkflow(
      response.data
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to update workflow status."
    );

  } finally {

    setUpdatingWorkflowStatus(false);

  }

};



  // =========================
  // DELETE TASK
  // =========================

  const handleDeleteTask = async (
    taskId: number
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );


    if (!confirmed) {

      return;

    }


    try {

      await api.delete(
        `/tasks/${taskId}`
      );


      setTasks(

        (previousTasks) =>

          previousTasks.filter(

            (task) =>

              task.id !== taskId

          )

      );


      if (
        editingTaskId === taskId
      ) {

        handleCancelEdit();

      }


    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete task."
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-slate-400">

          Loading workflow...

        </div>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error || !workflow) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

        <div className="text-center">


          <p className="text-red-400 mb-5">

            {error ||
              "Workflow not found."
            }

          </p>


          <button

            onClick={() =>
              navigate("/workflows")
            }

            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg transition"

          >

            Back to Workflows

          </button>


        </div>

      </div>

    );

  }


  // =========================
  // TASK STATISTICS
  // =========================

  const todoTasks =
    tasks.filter(

      (task) =>
        task.status === "todo"

    ).length;


  const inProgressTasks =
    tasks.filter(

      (task) =>
        task.status === "in_progress"

    ).length;


  const completedTasks =
    tasks.filter(

      (task) =>
        task.status === "completed"

    ).length;


    // =========================
// FILTERED TASKS
// =========================

const filteredTasks =
  tasks.filter(
    (task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        (
          task.description
            ?.toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            ) ?? false
        );


      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;


      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );

    }
  );


  // =========================
  // HELPER FUNCTIONS
  // =========================

  const getStatusStyle = (
    status: string
  ) => {

    if (
      status === "completed"
    ) {

      return (
        "bg-green-500/10 " +
        "text-green-400 " +
        "border-green-500/20"
      );

    }


    if (
      status === "in_progress"
    ) {

      return (
        "bg-yellow-500/10 " +
        "text-yellow-400 " +
        "border-yellow-500/20"
      );

    }


    return (
      "bg-purple-500/10 " +
      "text-purple-400 " +
      "border-purple-500/20"
    );

  };


  const getPriorityStyle = (
    priority: string
  ) => {

    if (
      priority === "high"
    ) {

      return (
        "bg-red-500/10 " +
        "text-red-400 " +
        "border-red-500/20"
      );

    }


    if (
      priority === "medium"
    ) {

      return (
        "bg-yellow-500/10 " +
        "text-yellow-400 " +
        "border-yellow-500/20"
      );

    }


    return (
      "bg-blue-500/10 " +
      "text-blue-400 " +
      "border-blue-500/20"
    );

  };


  const formatStatus = (
    status: string
  ) => {

    if (
      status === "in_progress"
    ) {

      return "In Progress";

    }


    if (
      status === "completed"
    ) {

      return "Completed";

    }


    return "To Do";

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="min-h-screen bg-slate-950 text-white">


      {/* =========================
          NAVBAR
      ========================= */}

      <header className="border-b border-slate-800 bg-slate-900">

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">


          <div

            className="flex items-center gap-3 cursor-pointer"

            onClick={() =>
              navigate("/dashboard")
            }

          >


            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">

              <Workflow size={23} />

            </div>


            <div>


              <h1 className="text-2xl font-bold">

                FlowSync

              </h1>


              <p className="text-xs text-slate-400">

                Workflow Management

              </p>


            </div>


          </div>



          <button

            onClick={() =>
              navigate("/workflows")
            }

            className="flex items-center gap-2 text-slate-300 hover:text-white transition"

          >

            <ArrowLeft size={18} />

            Workflows

          </button>


        </div>

      </header>



      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">


        {/* BACK */}

        <button

          onClick={() =>
            navigate("/workflows")
          }

          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"

        >

          <ArrowLeft size={18} />

          Back to Workflows

        </button>



        {/* =========================
            WORKFLOW HEADER
        ========================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 mb-8">


          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">


            <div className="flex gap-4">


              <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                <Workflow
                  size={26}
                  className="text-blue-400"
                />

              </div>



              <div>


                <h2 className="text-3xl font-bold mb-2">

                  {workflow.name}

                </h2>


                <p className="text-slate-400 max-w-2xl">

                  {workflow.description ||
                    "No description provided."
                  }

                </p>


              </div>


            </div>



            <div className="self-start">

  <label className="block text-xs text-slate-500 mb-2">

    WORKFLOW STATUS

  </label>

  <select

    value={workflow.status}

    disabled={updatingWorkflowStatus}

    onChange={(event) =>
      handleWorkflowStatusChange(
        event.target.value
      )
    }

    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-60"

  >

    <option value="active">
  Active
</option>

<option value="completed">
  Completed
</option>

<option value="archived">
  Archived
</option>

  </select>

</div>


          </div>

        </div>



        {/* =========================
            TASK STATISTICS
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


          {/* TOTAL */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">


            <div className="flex justify-between items-center mb-4">


              <span className="text-slate-400">

                Total Tasks

              </span>


              <ClipboardList
                size={20}
                className="text-blue-400"
              />


            </div>


            <p className="text-3xl font-bold">

              {tasks.length}

            </p>


          </div>



          {/* TODO */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">


            <div className="flex justify-between items-center mb-4">


              <span className="text-slate-400">

                To Do

              </span>


              <ListTodo
                size={20}
                className="text-purple-400"
              />


            </div>


            <p className="text-3xl font-bold">

              {todoTasks}

            </p>


          </div>



          {/* IN PROGRESS */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">


            <div className="flex justify-between items-center mb-4">


              <span className="text-slate-400">

                In Progress

              </span>


              <Clock
                size={20}
                className="text-yellow-400"
              />


            </div>


            <p className="text-3xl font-bold">

              {inProgressTasks}

            </p>


          </div>



          {/* COMPLETED */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">


            <div className="flex justify-between items-center mb-4">


              <span className="text-slate-400">

                Completed

              </span>


              <CheckCircle2
                size={20}
                className="text-green-400"
              />


            </div>


            <p className="text-3xl font-bold">

              {completedTasks}

            </p>


          </div>


        </div>



        {/* =========================
            CREATE TASK
        ========================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">


          <div className="flex items-center gap-3 mb-7">


            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">

              <Plus
                size={20}
                className="text-blue-400"
              />

            </div>


            <div>


              <h2 className="text-xl font-semibold">

                Create Task

              </h2>


              <p className="text-sm text-slate-400">

                Add a new task to this workflow.

              </p>


            </div>


          </div>



          {taskError && (

            <div className="mb-5 border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg">

              {taskError}

            </div>

          )}



          <form
            onSubmit={handleCreateTask}
            className="space-y-5"
          >


            <div>


              <label className="block text-sm font-medium text-slate-300 mb-2">

                Task Title

              </label>


              <input

                type="text"

                value={taskTitle}

                onChange={(event) =>
                  setTaskTitle(
                    event.target.value
                  )
                }

                placeholder="Enter task title"

                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-600 transition"

              />


            </div>



            <div>


              <label className="block text-sm font-medium text-slate-300 mb-2">

                Description

                <span className="text-slate-500 ml-1">

                  (Optional)

                </span>

              </label>


              <textarea

                value={taskDescription}

                onChange={(event) =>
                  setTaskDescription(
                    event.target.value
                  )
                }

                placeholder="Describe this task..."

                rows={3}

                className="w-full resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-600 transition"

              />


            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              <div>


                <label className="block text-sm font-medium text-slate-300 mb-2">

                  Priority

                </label>


                <select

                  value={taskPriority}

                  onChange={(event) =>
                    setTaskPriority(
                      event.target.value
                    )
                  }

                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                >

                  <option value="low">

                    Low

                  </option>

                  <option value="medium">

                    Medium

                  </option>

                  <option value="high">

                    High

                  </option>

                </select>


              </div>



              <div>


                <label className="block text-sm font-medium text-slate-300 mb-2">

                  Due Date

                  <span className="text-slate-500 ml-1">

                    (Optional)

                  </span>

                </label>


                <input

                  type="datetime-local"

                  value={taskDueDate}

                  onChange={(event) =>
                    setTaskDueDate(
                      event.target.value
                    )
                  }

                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                />


              </div>


            </div>



            <button

              type="submit"

              disabled={creatingTask}

              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-medium transition"

            >

              <Plus size={18} />


              {creatingTask
                ? "Creating..."
                : "Create Task"
              }

            </button>


          </form>


        </section>



        {/* =========================
            WORKFLOW TASKS
        ========================= */}

        <section>


          {/* =========================
    SEARCH + FILTERS
========================= */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


    {/* SEARCH */}

    <input

      type="text"

      value={searchQuery}

      onChange={(event) =>
        setSearchQuery(
          event.target.value
        )
      }

      placeholder="Search tasks..."

      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-600"

    />


    {/* STATUS FILTER */}

    <select

      value={statusFilter}

      onChange={(event) =>
        setStatusFilter(
          event.target.value
        )
      }

      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

    >

      <option value="all">
        All Statuses
      </option>

      <option value="todo">
        To Do
      </option>

      <option value="in_progress">
        In Progress
      </option>

      <option value="completed">
        Completed
      </option>

    </select>


    {/* PRIORITY FILTER */}

    <select

      value={priorityFilter}

      onChange={(event) =>
        setPriorityFilter(
          event.target.value
        )
      }

      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

    >

      <option value="all">
        All Priorities
      </option>

      <option value="low">
        Low Priority
      </option>

      <option value="medium">
        Medium Priority
      </option>

      <option value="high">
        High Priority
      </option>

    </select>


  </div>

</div>


          <div className="flex items-center justify-between mb-6">


            <div>


              <h2 className="text-2xl font-bold">

                Workflow Tasks

              </h2>


              <p className="text-sm text-slate-400 mt-1">

                Manage, edit and track your tasks.

              </p>


            </div>



            <span className="text-sm text-slate-400">

              {tasks.length}{" "}

              {tasks.length === 1
                ? "task"
                : "tasks"
              }

            </span>


          </div>



          {/* EMPTY STATE */}

          {filteredTasks.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">


              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-slate-800 flex items-center justify-center">

                <ClipboardList
                  size={30}
                  className="text-slate-500"
                />

              </div>


              <h3 className="text-lg font-semibold mb-2">

                No tasks yet

              </h3>


              <p className="text-slate-400">

                Create your first task above.

              </p>


            </div>


          ) : (


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {filteredTasks.map(

                (task) => (


                  <div

                    key={task.id}

                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition hover:border-slate-700"

                  >


                    {/* =========================
                        EDIT MODE
                    ========================= */}

                    {editingTaskId === task.id ? (

                      <div className="space-y-4">


                        <div className="flex items-center justify-between">


                          <h3 className="text-lg font-semibold">

                            Edit Task

                          </h3>


                          <button

                            onClick={handleCancelEdit}

                            disabled={savingTask}

                            className="p-2 text-slate-400 hover:text-white transition"

                            title="Cancel"

                          >

                            <X size={18} />

                          </button>


                        </div>



                        {/* TITLE */}

                        <input

                          type="text"

                          value={editTitle}

                          onChange={(event) =>
                            setEditTitle(
                              event.target.value
                            )
                          }

                          placeholder="Task title"

                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        />



                        {/* DESCRIPTION */}

                        <textarea

                          value={editDescription}

                          onChange={(event) =>
                            setEditDescription(
                              event.target.value
                            )
                          }

                          placeholder="Task description"

                          rows={3}

                          className="w-full resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        />



                        {/* PRIORITY */}

                        <select

                          value={editPriority}

                          onChange={(event) =>
                            setEditPriority(
                              event.target.value
                            )
                          }

                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        >

                          <option value="low">

                            Low Priority

                          </option>


                          <option value="medium">

                            Medium Priority

                          </option>


                          <option value="high">

                            High Priority

                          </option>


                        </select>



                        {/* DUE DATE */}

                        <input

                          type="datetime-local"

                          value={editDueDate}

                          onChange={(event) =>
                            setEditDueDate(
                              event.target.value
                            )
                          }

                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        />



                        {/* BUTTONS */}

                        <div className="flex gap-3 pt-2">


                          <button

                            onClick={() =>
                              handleSaveTask(
                                task.id
                              )
                            }

                            disabled={savingTask}

                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2.5 rounded-lg text-sm font-medium transition"

                          >

                            <Save size={17} />


                            {savingTask
                              ? "Saving..."
                              : "Save Changes"
                            }

                          </button>



                          <button

                            onClick={handleCancelEdit}

                            disabled={savingTask}

                            className="px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"

                          >

                            Cancel

                          </button>


                        </div>


                      </div>


                    ) : (


                      /* =========================
                          NORMAL MODE
                      ========================= */

                      <>


                        {/* HEADER */}

                        <div className="flex items-start justify-between gap-4 mb-5">


                          <div className="min-w-0">


                            <h3 className="text-lg font-semibold break-words">

                              {task.title}

                            </h3>


                            <p className="text-sm text-slate-400 mt-2 break-words">

                              {task.description ||
                                "No description provided."
                              }

                            </p>


                          </div>



                          <div className="flex items-center gap-1 shrink-0">


                            {/* EDIT */}

                            <button

                              onClick={() =>
                                handleEditTask(
                                  task
                                )
                              }

                              className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition"

                              title="Edit Task"

                            >

                              <Edit3 size={18} />

                            </button>



                            {/* DELETE */}

                            <button

                              onClick={() =>
                                handleDeleteTask(
                                  task.id
                                )
                              }

                              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"

                              title="Delete Task"

                            >

                              <Trash2 size={18} />

                            </button>


                          </div>


                        </div>



                        {/* BADGES */}

                        <div className="flex flex-wrap gap-2 mb-5">


                          {/* PRIORITY */}

                          <span

                            className={

                              "px-3 py-1 rounded-full text-xs border capitalize " +

                              getPriorityStyle(
                                task.priority
                              )

                            }

                          >

                            {task.priority} priority

                          </span>



                          {/* STATUS */}

                          <span

                            className={

                              "px-3 py-1 rounded-full text-xs border " +

                              getStatusStyle(
                                task.status
                              )

                            }

                          >

                            {formatStatus(
                              task.status
                            )}

                          </span>



                          {/* DUE DATE */}

                          {task.due_date && (

                            <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300">

                              Due:{" "}

                              {new Date(
                                task.due_date
                              ).toLocaleDateString()}

                            </span>

                          )}


                        </div>



                        {/* STATUS SELECT */}

                        <div className="border-t border-slate-800 pt-4">


                          <label className="block text-xs text-slate-500 mb-2">

                            TASK STATUS

                          </label>


                          <select

                            value={task.status}

                            onChange={(event) =>
                              handleStatusChange(

                                task.id,

                                event.target.value

                              )
                            }

                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"

                          >

                            <option value="todo">

                              To Do

                            </option>


                            <option value="in_progress">

                              In Progress

                            </option>


                            <option value="completed">

                              Completed

                            </option>


                          </select>


                        </div>


                      </>


                    )}


                  </div>


                )

              )}


            </div>


          )}


        </section>


      </main>


    </div>

  );

}


export default WorkflowDetails;