const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "24px 0",
    boxSizing: "border-box",
    background: "transparent",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    alignContent: "start",
    gap: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "680px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.07)",
    padding: "28px",
    boxSizing: "border-box",
    border: "1px solid #dfe5ec",
  },

  eventsCard: {
    width: "100%",
    minWidth: 0,
    margin: 0,
    padding: "24px",
    background: "#ffffff",
    border: "1px solid #dfe5ec",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.07)",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  tableBox: {
    width: "100%",
    overflowX: "auto",
    overscrollBehaviorInline: "contain",
    WebkitOverflowScrolling: "touch",
  },

  table: {
    width: "100%",
    minWidth: "680px",
    borderCollapse: "collapse",
    color: "#182230",
    fontSize: "14px",
  },

  tableHeader: {
    padding: "12px 14px",
    background: "#f2f6f8",
    borderBottom: "1px solid #dfe5ec",
    color: "#344054",
    textAlign: "left",
    whiteSpace: "nowrap",
  },

  tableCell: {
    padding: "12px 14px",
    borderBottom: "1px solid #e8edf2",
    textAlign: "left",
    whiteSpace: "nowrap",
  },

  deleteButton: {
    padding: "8px 12px",
    border: "0",
    borderRadius: "7px",
    background: "#b42318",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },

  info: {
    padding: "18px 0",
    color: "#667085",
    fontSize: "14px",
  },

  heading: {
    margin: "0 0 28px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#172033",
    textAlign: "center",
    letterSpacing: "0",
  },

  form: {
    display: "grid",
    gap: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#344054",
  },

  input: {
    width: "100%",
    padding: "13px 15px",
    borderRadius: "10px",
    border: "1px solid #d8dee8",
    boxSizing: "border-box",
    fontSize: "15px",
    color: "#172033",
    backgroundColor: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#475467",
  },

  button: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#ffffff",
    border: "none",
    padding: "14px 18px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 6px 16px rgba(16, 185, 129, 0.25)",
    transition: "all 0.2s ease",
  },

  message: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475467",
    textAlign: "center",
  },
};

export default styles;