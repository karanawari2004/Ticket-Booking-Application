const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff7ed",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(249,115,22,0.15)",
    border: "1px solid #fed7aa",
  },

  logo: {
    width: "55px",
    height: "55px",
    margin: "0 auto 15px",
    borderRadius: "14px",
    background: "#f97316",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "700",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#000000",
    fontSize: "27px",
  },

  subtitle: {
    textAlign: "center",
    color: "#555555",
    marginTop: "8px",
    marginBottom: "25px",
  },

  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "25px",
  },

  tab: {
    flex: 1,
    padding: "12px",
    border: "1px solid #fdba74",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#000000",
    cursor: "pointer",
    fontSize: "15px",
  },

  activeTab: {
    background: "#f97316",
    color: "#ffffff",
    borderColor: "#f97316",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    color: "#000000",
    fontWeight: "600",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#000000",
    outline: "none",
  },

  error: {
    padding: "11px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#fff1f2",
    color: "#991b1b",
    fontSize: "14px",
    border: "1px solid #fecdd3",
  },

  loginButton: {
    width: "100%",
    marginTop: "25px",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#f97316",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  resendButton: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    border: "1px solid #f97316",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#000000",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default styles;