import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import AdminEvents from "./pages/adminEvents";
import SellTicket from "./pages/sellTicket";
import SellTable from "./pages/sellTable";
import MySales from "./pages/mySales";
import Report from "./pages/report";

import Navbar from "./components/Navbar";

function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem("userRole") === "ADMIN";

  return isAdmin ? children : <Navigate to="/login" replace />;
}

/* Common layout for all protected pages */
function Layout({ children }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Separate Sidebar */}
      <Navbar />

      {/* Page Content */}
      <main className="app-main">
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login - No Sidebar */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Events Redirect */}
        <Route
          path="/events"
          element={
            localStorage.getItem("userRole") === "ADMIN" ? (
              <Navigate to="/admin-events" replace />
            ) : (
              <Navigate to="/sell-ticket" replace />
            )
          }
        />

        {/* Admin Events */}
        <Route
          path="/admin-events"
          element={
            <RequireAdmin>
              <Layout>
                <AdminEvents />
              </Layout>
            </RequireAdmin>
          }
        />

        {/* Sell Ticket */}
        <Route
          path="/sell-ticket"
          element={
            <Layout>
              <SellTicket />
            </Layout>
          }
        />

        {/* Sell Table */}
        <Route
          path="/sell-table"
          element={
            <Layout>
              <SellTable />
            </Layout>
          }
        />

        {/* My Sales */}
        <Route
          path="/my-sales"
          element={
            <Layout>
              <MySales />
            </Layout>
          }
        />

        {/* Report */}
        <Route
          path="/report"
          element={
            <Layout>
              <Report />
            </Layout>
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;