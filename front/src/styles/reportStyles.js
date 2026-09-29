const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff 0%, #f0fdfa 50%, #fff7ed 100%)",
    color: "#172033",
    padding: "40px 30px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  summary: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
    color: "#172033",
    padding: "24px",
    border: "1px solid #dbe4ff",
    borderRadius: "16px",
    flex: 1,
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.12)",
  },

  table: {
    width: "100%",
    background: "#ffffff",
    color: "#172033",
    borderCollapse: "collapse",
    border: "1px solid #dbe4ff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.12)",
  },
};

export default styles;