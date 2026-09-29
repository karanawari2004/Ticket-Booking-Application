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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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

        <Route
          path="/admin-events"
          element={
            <RequireAdmin>
              <>
                <Navbar />
                <AdminEvents />
              </>
            </RequireAdmin>
          }
        />

        <Route
          path="/sell-ticket"
          element={
            <>
              <Navbar />
              <SellTicket />
            </>
          }
        />

        <Route
          path="/sell-table"
          element={
            <>
              <Navbar />
              <SellTable />
            </>
          }
        />

        <Route
          path="/my-sales"
          element={
            <>
              <Navbar />
              <MySales />
            </>
          }
        />

        <Route
          path="/report"
          element={
            <>
              <Navbar />
              <Report />
            </>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;