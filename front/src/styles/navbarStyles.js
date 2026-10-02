const styles = {
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "250px",
    height: "100vh",
    padding: "0",
    background: "#111827",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    boxSizing: "border-box",
    overflowY: "auto",
    transition: "transform 180ms ease",
    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.08)",
  },

  sidebarOpen: {
    transform: "translateX(0)",
  },

  menuButton: {
    display: "none",
    position: "fixed",
    top: "14px",
    left: "14px",
    zIndex: 1101,
    width: "44px",
    height: "44px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #dfe5ec",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#182230",
    fontSize: "22px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(23, 39, 56, 0.12)",
  },

  overlay: {
    display: "none",
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "rgba(16, 24, 40, 0.42)",
  },

  logoSection: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    boxSizing: "border-box",
  },

  logoIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    flexShrink: 0,
  },

  logo: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    lineHeight: 1.25,
  },

  role: {
    marginTop: "3px",
    fontSize: "11px",
    color: "#9ca3af",
  },

  links: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "18px 14px",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  sectionTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: "1px",
    padding: "0 12px",
    marginBottom: "10px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    width: "100%",
    minHeight: "46px",
    padding: "0 13px",
    marginBottom: "6px",
    borderRadius: "9px",
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#176b87",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    flexShrink: 0,
  },

  icon: {
    width: "22px",
    textAlign: "center",
    fontSize: "17px",
    flexShrink: 0,
  },

  bottomSection: {
    padding: "15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    boxSizing: "border-box",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "9px",
    background: "rgba(255, 255, 255, 0.05)",
  },

  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    flexShrink: 0,
  },

  userInfo: {
    minWidth: 0,
  },

  userName: {
    fontSize: "13px",
    fontWeight: "600",
  },

  userRole: {
    marginTop: "2px",
    fontSize: "10px",
    color: "#9ca3af",
  },

  logout: {
    width: "100%",
    height: "44px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
};

export default styles;