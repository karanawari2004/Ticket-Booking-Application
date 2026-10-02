import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbarStyles";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = localStorage.getItem("userRole");

  const isStaff = userRole === "STAFF";
  const isAdmin = userRole === "ADMIN";

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("eventId");

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="sidebar-toggle"
        style={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          style={styles.overlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`app-sidebar${isOpen ? " is-open" : ""}`}
        style={{
          ...styles.sidebar,
          ...(isOpen ? styles.sidebarOpen : {}),
        }}
      >
        {/* Logo */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🎟️</div>

          <div>
            <h2 style={styles.logo}>
              On-Ground Sales
            </h2>

            <p style={styles.role}>
              {isAdmin ? "Administrator" : "Staff"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          style={styles.links}
          aria-label="Main navigation"
        >

          {/* Sell Ticket */}
          {(isAdmin || !isStaff) && (
            <Link
              to="/sell-ticket"
              style={styles.link}
              onClick={closeSidebar}
            >
              <span style={styles.icon}>🎟️</span>
              <span>Sell Ticket</span>
            </Link>
          )}

          {/* Sell Table */}
          {(isAdmin || !isStaff) && (
            <Link
              to="/sell-table"
              style={styles.link}
              onClick={closeSidebar}
            >
              <span style={styles.icon}>🪑</span>
              <span>Sell Table</span>
            </Link>
          )}

          {/* My Sales */}
          {(isAdmin || isStaff) && (
            <Link
              to="/my-sales"
              style={styles.link}
              onClick={closeSidebar}
            >
              <span style={styles.icon}>📊</span>
              <span>My Sales</span>
            </Link>
          )}

          {/* Report */}
          {(isAdmin || !isStaff) && (
            <Link
              to="/report"
              style={styles.link}
              onClick={closeSidebar}
            >
              <span style={styles.icon}>📈</span>
              <span>Report</span>
            </Link>
          )}

          {/* Admin Events */}
          {isAdmin && (
            <Link
              to="/admin-events"
              style={styles.link}
              onClick={closeSidebar}
            >
              <span style={styles.icon}>⚙️</span>
              <span>Admin Events</span>
            </Link>
          )}
        </nav>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>

          <div style={styles.userBox}>
            <div style={styles.avatar}>
              {isAdmin ? "A" : "S"}
            </div>

            <div>
              <div style={styles.userName}>
                {isAdmin ? "Admin" : "Staff"}
              </div>

              <div style={styles.userRole}>
                {userRole || "USER"}
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            style={styles.logout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}

export default Navbar;