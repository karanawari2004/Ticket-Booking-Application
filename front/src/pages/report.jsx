
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/api";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

function Report() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSales = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API}/v1/on-ground/sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch sales"
        );
      }

      const validSales = (
        Array.isArray(data) ? data : data.sales || []
      ).filter(
        (sale) =>
          sale &&
          sale._id &&
          sale.buyerName &&
          sale.quantity
      );

      setSales(validSales);
    } catch (error) {
      console.log("Report error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  // Total tickets sold
  const totalTickets = sales.reduce(
    (total, sale) =>
      total + toNumber(sale.quantity),
    0
  );

  // Total income
  const totalIncome = sales.reduce(
    (total, sale) =>
      total + toNumber(sale.totalAmount),
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("eventId");

    navigate("/login");
  };

  return (
    <div className="report-page" style={styles.layout}>

      {/* ================= SIDEBAR ================= */}

      <aside style={styles.sidebar}>

        {/* Brand */}
        <div style={styles.brand}>

          <div style={styles.logo}>
            OG
          </div>

          <div>
            <h2 style={styles.brandTitle}>
              On-Ground
            </h2>

            <p style={styles.brandSubtitle}>
              Sales Dashboard
            </p>
          </div>

        </div>

        <div style={styles.divider}></div>

        {/* Navigation */}
        <nav style={styles.nav}>

          <button
            style={styles.navItem}
            onClick={() => navigate("/events")}
          >
            <span style={styles.navIcon}>
              📅
            </span>

            <span>
              Events
            </span>
          </button>

          <button
            style={styles.navItem}
            onClick={() => navigate("/sell-ticket")}
          >
            <span style={styles.navIcon}>
              🎟️
            </span>

            <span>
              Sell Ticket
            </span>
          </button>

          <button
            style={styles.navItem}
            onClick={() => navigate("/sell-table")}
          >
            <span style={styles.navIcon}>
              🪑
            </span>

            <span>
              Sell Table
            </span>
          </button>

          <button
            style={styles.navItem}
            onClick={() => navigate("/my-sales")}
          >
            <span style={styles.navIcon}>
              📊
            </span>

            <span>
              My Sales
            </span>
          </button>

          {/* Active Page */}
          <button
            style={styles.activeNavItem}
            onClick={() => navigate("/report")}
          >
            <span style={styles.navIcon}>
              📈
            </span>

            <span>
              Report
            </span>
          </button>

          {/* Admin Only */}
          {userRole === "ADMIN" && (
            <button
              style={styles.navItem}
              onClick={() =>
                navigate("/admin-events")
              }
            >
              <span style={styles.navIcon}>
                ⚙️
              </span>

              <span>
                Admin Events
              </span>
            </button>
          )}

        </nav>

        {/* Sidebar Bottom */}
        <div style={styles.sidebarBottom}>

          {/* User */}
          <div style={styles.userBox}>

            <div style={styles.userAvatar}>
              {userRole === "ADMIN"
                ? "A"
                : "S"}
            </div>

            <div>
              <p style={styles.userName}>
                {userRole === "ADMIN"
                  ? "Administrator"
                  : "Staff"}
              </p>

              <p style={styles.userRole}>
                {userRole || "USER"}
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            <span style={styles.logoutIcon}>
              ↪
            </span>

            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="legacy-page-main" style={styles.main}>

        {/* Header */}
        <div style={styles.header}>

          <div>

            <p style={styles.overline}>
              ANALYTICS
            </p>

            <h1 style={styles.title}>
              Sales Report
            </h1>

            <p style={styles.subtitle}>
              Monitor ticket sales, payments and
              revenue
            </p>

          </div>

          <button
            style={styles.refreshButton}
            onClick={getSales}
          >
            <span style={styles.refreshIcon}>
              ↻
            </span>

            Refresh
          </button>

        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div style={styles.summary}>

          {/* Total Sales */}
          <div style={styles.card}>

            <div style={styles.cardTop}>

              <div style={styles.iconBoxBlue}>
                📊
              </div>

              <span style={styles.cardLabel}>
                TOTAL SALES
              </span>

            </div>

            <h2 style={styles.cardValue}>
              {sales.length}
            </h2>

            <p style={styles.cardDescription}>
              Completed sales records
            </p>

          </div>

          {/* Tickets Sold */}
          <div style={styles.card}>

            <div style={styles.cardTop}>

              <div style={styles.iconBoxPurple}>
                🎟️
              </div>

              <span style={styles.cardLabel}>
                TICKETS SOLD
              </span>

            </div>

            <h2 style={styles.cardValue}>
              {totalTickets}
            </h2>

            <p style={styles.cardDescription}>
              Total tickets sold
            </p>

          </div>

          {/* Total Income */}
          <div style={styles.card}>

            <div style={styles.cardTop}>

              <div style={styles.iconBoxGreen}>
                ₹
              </div>

              <span style={styles.cardLabel}>
                TOTAL INCOME
              </span>

            </div>

            <h2 style={styles.incomeValue}>
              ₹{totalIncome.toFixed(2)}
            </h2>

            <p style={styles.cardDescription}>
              Total recorded revenue
            </p>

          </div>

        </div>

        {/* ================= SALES TABLE ================= */}

        <section style={styles.tableCard}>

          {/* Table Header */}
          <div style={styles.tableHeader}>

            <div>

              <h2 style={styles.tableTitle}>
                Sales Details
              </h2>

              <p style={styles.tableSubtitle}>
                Complete transaction history
              </p>

            </div>

            <div style={styles.salesCount}>
              {sales.length} Records
            </div>

          </div>

          {/* Loading */}
          {loading ? (

            <div style={styles.emptyState}>

              <div style={styles.loadingIcon}>
                ⟳
              </div>

              <h3 style={styles.emptyTitle}>
                Loading sales...
              </h3>

            </div>

          ) : sales.length > 0 ? (

            /* Table */
            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>

                  <tr>

                    <th style={styles.th}>
                      DATE
                    </th>

                    <th style={styles.th}>
                      BUYER
                    </th>

                    <th style={styles.th}>
                      PHONE
                    </th>

                    <th style={styles.th}>
                      TICKET
                    </th>

                    <th style={styles.th}>
                      QUANTITY
                    </th>

                    <th style={styles.th}>
                      PAYMENT
                    </th>

                    <th style={styles.th}>
                      STATUS
                    </th>

                    <th style={styles.th}>
                      TOTAL
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {sales.map((sale) => (

                    <tr
                      key={sale._id}
                      style={styles.tr}
                    >

                      {/* Date */}
                      <td style={styles.td}>
                        {sale.createdAt
                          ? new Date(
                              sale.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </td>

                      {/* Buyer */}
                      <td style={styles.buyerCell}>
                        {sale.buyerName}
                      </td>

                      {/* Phone */}
                      <td style={styles.td}>
                        {sale.buyerPhone || "-"}
                      </td>

                      {/* Ticket */}
                      <td style={styles.td}>
                        {sale.ticketType || "-"}
                      </td>

                      {/* Quantity */}
                      <td style={styles.quantityCell}>
                        {sale.quantity}
                      </td>

                      {/* Payment */}
                      <td style={styles.td}>

                        <span
                          style={
                            styles.paymentBadge
                          }
                        >
                          {sale.paymentMethod ||
                            "-"}
                        </span>

                      </td>

                      {/* Status */}
                      <td style={styles.td}>

                        <span
                          style={
                            sale.paymentStatus ===
                            "PAID"
                              ? styles.paidBadge
                              : styles.pendingBadge
                          }
                        >
                          {sale.paymentStatus ||
                            "-"}
                        </span>

                      </td>

                      {/* Total */}
                      <td style={styles.amountCell}>
                        ₹
                        {toNumber(
                          sale.totalAmount
                        ).toFixed(2)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            /* No Sales */
            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                📊
              </div>

              <h3 style={styles.emptyTitle}>
                No sales found
              </h3>

              <p style={styles.emptyText}>
                Sales transactions will appear
                here once tickets are sold.
              </p>

            </div>

          )}

        </section>

      </main>

      {/* ================= RESPONSIVE CSS ================= */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          button {
            font-family: inherit;
          }

          button:hover {
            opacity: 0.92;
          }

          @media (max-width: 1100px) {

            .report-main {
              padding: 30px 25px !important;
            }

          }

          @media (max-width: 850px) {

            .report-layout {
              display: block !important;
            }

            .report-sidebar {
              position: relative !important;
              width: 100% !important;
              min-width: 100% !important;
              height: auto !important;
            }

            .report-nav {
              flex-direction: row !important;
              flex-wrap: wrap !important;
            }

            .report-sidebar-bottom {
              margin-top: 20px !important;
            }

            .report-main {
              width: 100% !important;
              margin-left: 0 !important;
              padding: 25px 20px !important;
            }

            .report-summary {
              grid-template-columns: 1fr !important;
            }

          }

          @media (max-width: 600px) {

            .report-main {
              padding: 20px 14px !important;
            }

            .report-header {
              flex-direction: column !important;
              align-items: flex-start !important;
            }

            .report-title {
              font-size: 26px !important;
            }

            .report-refresh {
              width: 100% !important;
            }

            .report-table-card {
              border-radius: 12px !important;
            }

            .report-table-header {
              padding: 16px !important;
            }

          }
        `}
      </style>

    </div>
  );
}


/* =====================================================
   STYLES
===================================================== */

const styles = {

  /* Layout */
  layout: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    background: "#f4f7fb",
    color: "#111827",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* Sidebar */
  sidebar: {
    width: "250px",
    minWidth: "250px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    background:
      "linear-gradient(180deg, #111827 0%, #172033 100%)",
    color: "#ffffff",
    boxShadow:
      "8px 0 30px rgba(15, 23, 42, 0.08)",
    zIndex: 100,
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "4px 8px 20px",
  },

  logo: {
    width: "44px",
    height: "44px",
    minWidth: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "13px",
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "800",
    boxShadow:
      "0 8px 20px rgba(37, 99, 235, 0.28)",
  },

  brandTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "750",
  },

  brandSubtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
  },

  divider: {
    width: "100%",
    height: "1px",
    marginBottom: "18px",
    background: "rgba(255,255,255,0.08)",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  navItem: {
    width: "100%",
    minHeight: "46px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 13px",
    border: "1px solid transparent",
    borderRadius: "11px",
    background: "transparent",
    color: "#cbd5e1",
    fontSize: "14px",
    fontWeight: "550",
    textAlign: "left",
    cursor: "pointer",
  },

  activeNavItem: {
    width: "100%",
    minHeight: "46px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 13px",
    border: "1px solid rgba(96,165,250,0.18)",
    borderRadius: "11px",
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "650",
    textAlign: "left",
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(37, 99, 235, 0.20)",
  },

  navIcon: {
    width: "22px",
    minWidth: "22px",
    textAlign: "center",
    fontSize: "17px",
  },

  sidebarBottom: {
    marginTop: "auto",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "13px 10px",
    marginBottom: "10px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.06)",
  },

  userAvatar: {
    width: "36px",
    height: "36px",
    minWidth: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "700",
  },

  userName: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "13px",
    fontWeight: "600",
  },

  userRole: {
    margin: "3px 0 0",
    color: "#94a3b8",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },

  logoutButton: {
    width: "100%",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border:
      "1px solid rgba(248,113,113,0.18)",
    borderRadius: "10px",
    background:
      "rgba(239,68,68,0.08)",
    color: "#fca5a5",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutIcon: {
    fontSize: "18px",
  },

  /* Main */
  main: {
    width: "calc(100% - 250px)",
    minHeight: "100vh",
    marginLeft: "250px",
    padding: "36px 40px 45px",
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    marginBottom: "30px",
  },

  overline: {
    margin: "0 0 7px",
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: "750",
    letterSpacing: "1.5px",
  },

  title: {
    margin: 0,
    color: "#111827",
    fontSize: "30px",
    fontWeight: "750",
    letterSpacing: "-0.7px",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#667085",
    fontSize: "14px",
  },

  refreshButton: {
    height: "44px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "1px solid #d0d5dd",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#344054",
    fontSize: "13px",
    fontWeight: "650",
    cursor: "pointer",
    boxShadow:
      "0 2px 5px rgba(16,24,40,0.05)",
    whiteSpace: "nowrap",
  },

  refreshIcon: {
    fontSize: "18px",
  },

  /* Summary */
  summary: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    minWidth: 0,
    padding: "22px",
    border: "1px solid #e4e7ec",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow:
      "0 5px 20px rgba(15,23,42,0.055)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    marginBottom: "18px",
  },

  cardLabel: {
    color: "#667085",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
  },

  iconBoxBlue: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "#eff6ff",
    fontSize: "18px",
  },

  iconBoxPurple: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "#f5f3ff",
    fontSize: "18px",
  },

  iconBoxGreen: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "#ecfdf3",
    color: "#16a34a",
    fontSize: "18px",
    fontWeight: "750",
  },

  cardValue: {
    margin: 0,
    color: "#101828",
    fontSize: "30px",
    fontWeight: "750",
  },

  incomeValue: {
    margin: 0,
    color: "#101828",
    fontSize: "27px",
    fontWeight: "750",
  },

  cardDescription: {
    margin: "7px 0 0",
    color: "#98a2b3",
    fontSize: "12px",
  },

  /* Table */
  tableCard: {
    width: "100%",
    border: "1px solid #e4e7ec",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow:
      "0 5px 20px rgba(15,23,42,0.055)",
    overflow: "hidden",
  },

  tableHeader: {
    minHeight: "80px",
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    borderBottom: "1px solid #eaecf0",
  },

  tableTitle: {
    margin: 0,
    color: "#101828",
    fontSize: "17px",
    fontWeight: "700",
  },

  tableSubtitle: {
    margin: "5px 0 0",
    color: "#98a2b3",
    fontSize: "12px",
  },

  salesCount: {
    padding: "7px 11px",
    borderRadius: "20px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
  },

  table: {
    width: "100%",
    minWidth: "950px",
    borderCollapse: "collapse",
  },

  th: {
    padding: "14px 16px",
    background: "#f8fafc",
    borderBottom: "1px solid #eaecf0",
    color: "#667085",
    fontSize: "10px",
    fontWeight: "750",
    letterSpacing: "0.6px",
    textAlign: "left",
    whiteSpace: "nowrap",
  },

  tr: {
    borderBottom: "1px solid #f0f2f5",
  },

  td: {
    padding: "15px 16px",
    color: "#475467",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },

  buyerCell: {
    padding: "15px 16px",
    color: "#101828",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  quantityCell: {
    padding: "15px 16px",
    color: "#101828",
    fontSize: "13px",
    fontWeight: "700",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  amountCell: {
    padding: "15px 16px",
    color: "#101828",
    fontSize: "13px",
    fontWeight: "750",
    whiteSpace: "nowrap",
  },

  /* Badges */
  paymentBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 9px",
    borderRadius: "6px",
    background: "#f2f4f7",
    color: "#475467",
    fontSize: "10px",
    fontWeight: "650",
    textTransform: "uppercase",
  },

  paidBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 9px",
    borderRadius: "6px",
    background: "#ecfdf3",
    color: "#027a48",
    fontSize: "10px",
    fontWeight: "700",
  },

  pendingBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 9px",
    borderRadius: "6px",
    background: "#fffaeb",
    color: "#b54708",
    fontSize: "10px",
    fontWeight: "700",
  },

  /* Empty */
  emptyState: {
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px 20px",
    textAlign: "center",
  },

  emptyIcon: {
    width: "58px",
    height: "58px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    background: "#f2f4f7",
    fontSize: "25px",
  },

  loadingIcon: {
    width: "58px",
    height: "58px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "25px",
  },

  emptyTitle: {
    margin: 0,
    color: "#344054",
    fontSize: "16px",
    fontWeight: "700",
  },

  emptyText: {
    maxWidth: "380px",
    margin: "7px 0 0",
    color: "#98a2b3",
    fontSize: "13px",
    lineHeight: "1.5",
  },
};

export default Report;
