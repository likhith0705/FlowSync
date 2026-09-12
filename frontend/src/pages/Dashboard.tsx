import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Workflow,
  ListTodo,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import api from "../api/api";
import { useAuth } from "../context/AuthContext";


interface DashboardData {
  total_workflows: number;
  active_workflows: number;

  total_tasks: number;
  todo_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;

  completion_percentage: number;
}


function Dashboard() {

  const navigate = useNavigate();

  const { logout } = useAuth();


  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // FETCH DASHBOARD
  // =========================

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response =
          await api.get("/dashboard/");

        setDashboard(response.data);

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load dashboard."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">

        Loading dashboard...

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">

        {error}

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-slate-950 text-white">


      {/* =====================
          NAVBAR
      ===================== */}

      <nav className="border-b border-slate-800 bg-slate-900">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">

              <Workflow size={22} />

            </div>


            <div>

              <h1 className="font-semibold text-lg">

                FlowSync

              </h1>

              <p className="text-xs text-slate-400">

                Workflow Management

              </p>

            </div>

          </div>



          <div className="flex items-center gap-3">


            <button
              onClick={() =>
                navigate("/workflows")
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >

              <Workflow size={18} />

              Workflows

            </button>



            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >

              <LogOut size={18} />

              Logout

            </button>


          </div>

        </div>

      </nav>



      {/* =====================
          MAIN CONTENT
      ===================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* HEADER */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-3">

            <LayoutDashboard
              className="text-blue-400"
              size={28}
            />

            <h2 className="text-3xl font-bold">

              Dashboard

            </h2>

          </div>


          <p className="text-slate-400">

            Monitor your workflows and task progress.

          </p>

        </div>



        {/* =====================
            STAT CARDS
        ===================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


          {/* WORKFLOWS */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-slate-400">

                Total Workflows

              </p>

              <Workflow
                className="text-blue-400"
                size={22}
              />

            </div>


            <h3 className="text-3xl font-bold mt-4">

              {dashboard?.total_workflows ?? 0}

            </h3>


            <p className="text-sm text-slate-500 mt-2">

              {dashboard?.active_workflows ?? 0} active

            </p>

          </div>



          {/* TOTAL TASKS */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-slate-400">

                Total Tasks

              </p>

              <ListTodo
                className="text-purple-400"
                size={22}
              />

            </div>


            <h3 className="text-3xl font-bold mt-4">

              {dashboard?.total_tasks ?? 0}

            </h3>


            <p className="text-sm text-slate-500 mt-2">

              Across all workflows

            </p>

          </div>



          {/* IN PROGRESS */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-slate-400">

                In Progress

              </p>

              <Clock3
                className="text-yellow-400"
                size={22}
              />

            </div>


            <h3 className="text-3xl font-bold mt-4">

              {dashboard?.in_progress_tasks ?? 0}

            </h3>


            <p className="text-sm text-slate-500 mt-2">

              Tasks currently active

            </p>

          </div>



          {/* COMPLETED */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-slate-400">

                Completed

              </p>

              <CheckCircle2
                className="text-green-400"
                size={22}
              />

            </div>


            <h3 className="text-3xl font-bold mt-4">

              {dashboard?.completed_tasks ?? 0}

            </h3>


            <p className="text-sm text-slate-500 mt-2">

              Completed tasks

            </p>

          </div>


        </div>



        {/* =====================
            SECOND ROW
        ===================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">


          {/* TASK STATUS */}

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">


            <h3 className="text-xl font-semibold mb-6">

              Task Overview

            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


              {/* TODO */}

              <div className="bg-slate-950 rounded-lg p-5 border border-slate-800">

                <p className="text-slate-400">

                  To Do

                </p>


                <h4 className="text-2xl font-bold mt-2">

                  {dashboard?.todo_tasks ?? 0}

                </h4>

              </div>



              {/* PROGRESS */}

              <div className="bg-slate-950 rounded-lg p-5 border border-slate-800">

                <p className="text-slate-400">

                  In Progress

                </p>


                <h4 className="text-2xl font-bold mt-2">

                  {dashboard?.in_progress_tasks ?? 0}

                </h4>

              </div>



              {/* OVERDUE */}

              <div className="bg-slate-950 rounded-lg p-5 border border-slate-800">

                <div className="flex items-center gap-2 text-red-400">

                  <AlertTriangle size={18} />

                  <p>

                    Overdue

                  </p>

                </div>


                <h4 className="text-2xl font-bold mt-2">

                  {dashboard?.overdue_tasks ?? 0}

                </h4>

              </div>


            </div>


          </div>



          {/* =====================
              COMPLETION PROGRESS
          ===================== */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">


            <h3 className="text-xl font-semibold">

              Completion Progress

            </h3>


            <div className="flex flex-col items-center justify-center py-8">


              <div className="text-5xl font-bold text-blue-400">

                {dashboard?.completion_percentage ?? 0}%

              </div>


              <p className="text-slate-400 mt-3">

                Overall completion

              </p>


              {/* PROGRESS BAR */}

              <div className="w-full h-3 bg-slate-800 rounded-full mt-6 overflow-hidden">

                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${dashboard?.completion_percentage ?? 0}%`
                  }}
                />

              </div>


            </div>


          </div>


        </div>



        {/* =====================
            QUICK ACTION
        ===================== */}

        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">


          <div>

            <h3 className="text-lg font-semibold">

              Manage your workflows

            </h3>


            <p className="text-slate-400 mt-1">

              Create workflows and organize your tasks efficiently.

            </p>

          </div>


          <button
            onClick={() =>
              navigate("/workflows")
            }
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg font-medium transition"
          >

            Open Workflows

          </button>


        </div>


      </main>

    </div>

  );

}


export default Dashboard;