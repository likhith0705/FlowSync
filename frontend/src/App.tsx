import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workflows from "./pages/WorkflowsPage";
import WorkflowDetails from "./pages/WorkflowDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/workflows"
          element={<Workflows />}
        />

        <Route
          path="/workflows/:workflowId"
          element={<WorkflowDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;