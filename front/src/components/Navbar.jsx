import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbarStyles";

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const isStaff = userRole === "STAFF";
  const isAdmin = userRole === "ADMIN";

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("eventId");

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>On-Ground Sales</h2>

      <div style={styles.links}>
        {isAdmin && (
          <>
           
            <Link to="/sell-ticket" style={styles.link}>
              Sell Ticket
            </Link>
            <Link to="/sell-table" style={styles.link}>
              Sell Table
            </Link>
            <Link to="/my-sales" style={styles.link}>
              My Sales
            </Link>
            <Link to="/report" style={styles.link}>
              Report
            </Link>
             <Link to="/admin-events" style={styles.link}>
              Admin Events
            </Link>
          </>
        )}

        {isStaff && (
          <>
            <Link to="/sell-ticket" style={styles.link}>
              Sell Ticket
            </Link>
            <Link to="/my-sales" style={styles.link}>
              My Sales
            </Link>
          </>
        )}

        {!isStaff && !isAdmin && (
          <>
            <Link to="/sell-ticket" style={styles.link}>
              Sell Ticket
            </Link>
            <Link to="/sell-table" style={styles.link}>
              Sell Table
            </Link>
            <Link to="/report" style={styles.link}>
              Report
            </Link>
          </>
        )}

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;