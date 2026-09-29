
import { useEffect, useState } from "react";
import API from "../config/api";
import styles from "../styles/mySalesStyles";

function MySales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSales = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API}/v1/on-ground/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load sales");
      }

      if (Array.isArray(data)) {
        setSales(data);
      } else {
        setSales(data.sales || []);
      }
    } catch (error) {
      console.log("My Sales error:", error);
      setError(error.message || "Unable to load sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>My Sales</h2>
            <p style={styles.subtitle}>Your ticket sales</p>
          </div>

          <div style={styles.count}>
            {sales.length} Sales
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <div style={styles.info}>Loading sales...</div>
        ) : sales.length === 0 ? (
          <div style={styles.info}>No sales found.</div>
        ) : (
          <div style={styles.tableBox}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Event</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Ticket</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id}>
                    <td style={styles.td}>
                      {sale.eventId?.name ||
                        sale.eventId?.title ||
                        sale.eventName ||
                        "-"}
                    </td>

                    <td style={styles.td}>
                      {sale.buyerName || "-"}
                    </td>

                    <td style={styles.td}>
                      {sale.buyerPhone || "-"}
                    </td>

                    <td style={styles.td}>
                      {sale.ticketType || "-"}
                    </td>

                    <td style={styles.td}>
                      {sale.quantity || 0}
                    </td>

                    <td style={styles.amount}>
                      ₹{Number(sale.totalAmount || 0).toFixed(2)}
                    </td>

                    <td style={styles.td}>
                      {sale.createdAt
                        ? new Date(
                            sale.createdAt
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
export default MySales;
