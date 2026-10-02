const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eef2ff 100%)",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    padding: "38px",
    borderRadius: "22px",
    boxSizing: "border-box",
    border: "1px solid #e4e7ec",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.10)",
  },

  logo: {
    width: "58px",
    height: "58px",
    margin: "0 auto 16px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "800",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.25)",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#101828",
    fontSize: "28px",
    fontWeight: "750",
    letterSpacing: "-0.6px",
  },

  subtitle: {
    textAlign: "center",
    color: "#667085",
    marginTop: "8px",
    marginBottom: "28px",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  tabs: {
    display: "flex",
    gap: "8px",
    padding: "5px",
    marginBottom: "25px",
    background: "#f2f4f7",
    borderRadius: "12px",
  },

  tab: {
    flex: 1,
    padding: "11px 10px",
    border: "none",
    borderRadius: "9px",
    background: "transparent",
    color: "#667085",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  activeTab: {
    background: "#ffffff",
    color: "#2563eb",
    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "16px",
    color: "#344054",
    fontWeight: "600",
    fontSize: "13px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #d0d5dd",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#101828",
    background: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },

  error: {
    padding: "11px 13px",
    marginBottom: "15px",
    borderRadius: "10px",
    background: "#fff1f3",
    color: "#b42318",
    fontSize: "13px",
    lineHeight: "1.5",
    border: "1px solid #fecdca",
  },

  loginButton: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.22)",
    transition: "all 0.2s ease",
  },

  resendButton: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    border: "1px solid #c7d2fe",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#4f46e5",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default styles;