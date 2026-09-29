const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 30px",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#ffffff",
    marginBottom: "30px",
    boxShadow: "none",
    border: "none",
    borderBottom: "none",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#ffffff",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    padding: "9px 14px",
    borderRadius: "7px",
  },

  logout: {
    padding: "9px 16px",
    marginLeft: "8px",
    border: "1px solid #ffffff",
    borderRadius: "7px",
    backgroundColor: "#ffffff",
    color: "#ea580c",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default styles;