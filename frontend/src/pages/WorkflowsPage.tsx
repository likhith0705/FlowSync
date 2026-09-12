import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Workflow,
  Plus,
  LayoutDashboard,
  ArrowRight,
  Layers,
  FileText,
  Edit3,
  Trash2,
  Save,
  X,
} from "lucide-react";

import api from "../api/api";


interface WorkflowData {
  id: number;
  name: string;
  description: string | null;
  status: string;
  owner_id: number;
  created_at: string;
}


function Workflows() {

  const navigate = useNavigate();


  // =========================
  // WORKFLOW STATE
  // =========================

  const [workflows, setWorkflows] =
    useState<WorkflowData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // CREATE WORKFLOW STATE
  // =========================

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [creating, setCreating] =
    useState(false);


  // =========================
  // EDIT WORKFLOW STATE
  // =========================

  const [editingWorkflowId, setEditingWorkflowId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [savingWorkflow, setSavingWorkflow] =
    useState(false);


  // =========================
  // FETCH WORKFLOWS
  // =========================

  const fetchWorkflows = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await api.get("/workflows/");


      setWorkflows(
        response.data
      );


    } catch (error) {

      console.error(error);

      setError(
        "Failed to load workflows."
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchWorkflows();

  }, []);


  // =========================
  // CREATE WORKFLOW
  // =========================

  const handleCreateWorkflow = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    if (!name.trim()) {

      setError(
        "Workflow name is required."
      );

      return;

    }


    try {

      setCreating(true);

      setError("");


      const response =
        await api.post(

          "/workflows/",

          {

            name:
              name.trim(),

            description:
              description.trim()
                ? description.trim()
                : null,

          }

        );


      // Add workflow immediately

      setWorkflows(

        (previousWorkflows) => [

          ...previousWorkflows,

          response.data,

        ]

      );


      // Clear form

      setName("");

      setDescription("");


    } catch (error) {

      console.error(error);

      setError(
        "Failed to create workflow."
      );


    } finally {

      setCreating(false);

    }

  };


  // =========================
  // START EDITING WORKFLOW
  // =========================

  const handleEditWorkflow = (
    workflow: WorkflowData
  ) => {

    setEditingWorkflowId(
      workflow.id
    );


    setEditName(
      workflow.name
    );


    setEditDescription(
      workflow.description || ""
    );


    setError("");

  };


  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingWorkflowId(null);

    setEditName("");

    setEditDescription("");

  };


  // =========================
  // SAVE WORKFLOW
  // =========================

  const handleSaveWorkflow = async (
    workflowId: number
  ) => {

    if (!editName.trim()) {

      alert(
        "Workflow name is required."
      );

      return;

    }


    try {

      setSavingWorkflow(true);


      const response =
        await api.put(

          `/workflows/${workflowId}`,

          {

            name:
              editName.trim(),

            description:
              editDescription.trim()
                ? editDescription.trim()
                : null,

          }

        );


      // Update workflow immediately

      setWorkflows(

        (previousWorkflows) =>

          previousWorkflows.map(

            (workflow) =>

              workflow.id === workflowId

                ? response.data

                : workflow

          )

      );


      handleCancelEdit();


    } catch (error) {

      console.error(error);

      alert(
        "Failed to update workflow."
      );


    } finally {

      setSavingWorkflow(false);

    }

  };


  // =========================
  // DELETE WORKFLOW
  // =========================

  const handleDeleteWorkflow = async (
    workflowId: number
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this workflow? All tasks inside it may also be deleted."
      );


    if (!confirmed) {

      return;

    }


    try {

      await api.delete(
        `/workflows/${workflowId}`
      );


      // Remove workflow immediately

      setWorkflows(

        (previousWorkflows) =>

          previousWorkflows.filter(

            (workflow) =>

              workflow.id !== workflowId

          )

      );


    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete workflow."
      );

    }

  };



  // =========================
// UPDATE WORKFLOW STATUS
// =========================

const handleWorkflowStatusChange = async (

  workflowId: number,

  newStatus: string

) => {

  try {

    const response =
      await api.put(

        `/workflows/${workflowId}`,

        {

          status:
            newStatus,

        }

      );


    setWorkflows(

      (previousWorkflows) =>

        previousWorkflows.map(

          (workflow) =>

            workflow.id === workflowId

              ? response.data

              : workflow

        )

    );


  } catch (error) {

    console.error(error);

    alert(
      "Failed to update workflow status."
    );

  }

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


          {/* LOGO */}

          <div

            className="flex items-center gap-3 cursor-pointer"

            onClick={() =>
              navigate("/dashboard")
            }

          >

            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">

              <Workflow
                size={23}
                className="text-white"
              />

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


          {/* DASHBOARD BUTTON */}

          <button

            onClick={() =>
              navigate("/dashboard")
            }

            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"

          >

            <LayoutDashboard size={18} />

            Dashboard

          </button>


        </div>

      </header>



      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">


        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-10">


          <div className="flex items-center gap-3 mb-3">


            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

              <Layers
                size={22}
                className="text-blue-400"
              />

            </div>


            <div>

              <h2 className="text-3xl font-bold">

                Workflows

              </h2>


              <p className="text-slate-400 mt-1">

                Create and manage your workflows.

              </p>

            </div>


          </div>

        </div>



        {/* =========================
            ERROR
        ========================= */}

        {error && (

          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">

            {error}

          </div>

        )}



        {/* =========================
            CREATE WORKFLOW
        ========================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">


          <div className="flex items-center gap-3 mb-6">


            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">

              <Plus
                size={20}
                className="text-blue-400"
              />

            </div>


            <div>

              <h2 className="text-xl font-semibold">

                Create Workflow

              </h2>


              <p className="text-sm text-slate-400">

                Start organizing your tasks.

              </p>

            </div>


          </div>



          <form

            onSubmit={handleCreateWorkflow}

            className="space-y-5"

          >


            {/* WORKFLOW NAME */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">

                Workflow Name

              </label>


              <input

                type="text"

                placeholder="e.g. Website Development"

                value={name}

                onChange={(event) =>
                  setName(event.target.value)
                }

                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition"

              />

            </div>



            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">

                Description


                <span className="text-slate-500 ml-1">

                  (Optional)

                </span>

              </label>


              <textarea

                placeholder="Describe what this workflow is for..."

                value={description}

                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }

                rows={4}

                className="w-full resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition"

              />

            </div>



            {/* BUTTON */}

            <button

              type="submit"

              disabled={creating}

              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-medium transition"

            >

              <Plus size={18} />


              {creating
                ? "Creating..."
                : "Create Workflow"
              }

            </button>


          </form>


        </section>



        {/* =========================
            WORKFLOW LIST
        ========================= */}

        <section>


          <div className="flex items-center justify-between mb-6">


            <div>

              <h2 className="text-2xl font-bold">

                Your Workflows

              </h2>


              <p className="text-slate-400 text-sm mt-1">

                {workflows.length}{" "}

                {workflows.length === 1
                  ? "workflow"
                  : "workflows"
                }

              </p>

            </div>


          </div>



          {/* =========================
              LOADING
          ========================= */}

          {loading ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">

              Loading workflows...

            </div>


          ) : workflows.length === 0 ? (


            /* =====================
                EMPTY STATE
            ===================== */

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">


              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-slate-800 flex items-center justify-center">

                <Workflow
                  size={30}
                  className="text-slate-500"
                />

              </div>


              <h3 className="text-xl font-semibold mb-2">

                No workflows yet

              </h3>


              <p className="text-slate-400">

                Create your first workflow to start
                organizing your tasks.

              </p>


            </div>


          ) : (


            /* =====================
                WORKFLOW GRID
            ===================== */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">


              {workflows.map(

                (workflow) => (


                  <div

                    key={workflow.id}

                    className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:-translate-y-1 transition duration-200"

                  >


                    {/* =====================
                        EDIT MODE
                    ===================== */}

                    {editingWorkflowId === workflow.id ? (

                      <div className="space-y-4">


                        {/* EDIT HEADER */}

                        <div className="flex items-center justify-between">


                          <h3 className="text-lg font-semibold">

                            Edit Workflow

                          </h3>


                          <button

                            onClick={handleCancelEdit}

                            className="p-2 text-slate-400 hover:text-white transition"

                            title="Cancel"

                          >

                            <X size={18} />

                          </button>


                        </div>



                        {/* EDIT NAME */}

                        <input

                          type="text"

                          value={editName}

                          onChange={(event) =>
                            setEditName(
                              event.target.value
                            )
                          }

                          placeholder="Workflow name"

                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        />



                        {/* EDIT DESCRIPTION */}

                        <textarea

                          value={editDescription}

                          onChange={(event) =>
                            setEditDescription(
                              event.target.value
                            )
                          }

                          placeholder="Workflow description"

                          rows={4}

                          className="w-full resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

                        />



                        {/* EDIT BUTTONS */}

                        <div className="flex gap-3">


                          <button

                            onClick={() =>
                              handleSaveWorkflow(
                                workflow.id
                              )
                            }

                            disabled={savingWorkflow}

                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 rounded-lg text-sm font-medium transition"

                          >

                            <Save size={17} />


                            {savingWorkflow
                              ? "Saving..."
                              : "Save Changes"
                            }

                          </button>



                          <button

                            onClick={handleCancelEdit}

                            disabled={savingWorkflow}

                            className="px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"

                          >

                            Cancel

                          </button>


                        </div>


                      </div>


                    ) : (


                      /* =====================
                          NORMAL MODE
                      ===================== */

                      <>


                        {/* TOP */}

                        <div className="flex items-start justify-between mb-5">


                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">

                            <Workflow
                              size={21}
                              className="text-blue-400"
                            />

                          </div>



                          <div className="flex items-center gap-2">


                            {/* STATUS */}

<select

  value={workflow.status}

  onChange={(event) =>
    handleWorkflowStatusChange(

      workflow.id,

      event.target.value

    )
  }

  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500"

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



                            {/* EDIT */}

                            <button

                              onClick={() =>
                                handleEditWorkflow(
                                  workflow
                                )
                              }

                              className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition"

                              title="Edit Workflow"

                            >

                              <Edit3 size={17} />

                            </button>



                            {/* DELETE */}

                            <button

                              onClick={() =>
                                handleDeleteWorkflow(
                                  workflow.id
                                )
                              }

                              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"

                              title="Delete Workflow"

                            >

                              <Trash2 size={17} />

                            </button>


                          </div>


                        </div>



                        {/* NAME */}

                        <h3 className="text-lg font-semibold mb-2 truncate">

                          {workflow.name}

                        </h3>



                        {/* DESCRIPTION */}

                        <div className="flex gap-2 text-slate-400 text-sm mb-6 min-h-[40px]">


                          <FileText
                            size={16}
                            className="mt-0.5 shrink-0"
                          />


                          <p>

                            {workflow.description ||
                              "No description provided."
                            }

                          </p>


                        </div>



                        {/* OPEN BUTTON */}

                        <button

                          onClick={() =>
                            navigate(
                              `/workflows/${workflow.id}`
                            )
                          }

                          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white py-3 rounded-lg transition"

                        >

                          Open Workflow


                          <ArrowRight
                            size={17}
                          />

                        </button>


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


export default Workflows;