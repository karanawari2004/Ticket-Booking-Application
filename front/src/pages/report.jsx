import { useEffect, useState } from "react";
import API from "../config/api";
import styles from "../styles/reportStyles";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

function Report() {
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
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
        throw new Error(data.message || "Failed to fetch sales");
      }

      const validSales = (Array.isArray(data) ? data : data.sales || []).filter(
        (sale) =>
          sale &&
          sale._id &&
          sale.buyerName &&
          sale.quantity
      );

      setSales(validSales);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  //sale is quantity
  const totalTickets = sales.reduce(
    (total, sale) => total + toNumber(sale.quantity),
    0
  );

  const totalIncome = sales.reduce(
    (total, sale) => total + toNumber(sale.totalAmount),
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h2>Sales Report</h2>

    
        <div style={styles.summary}>

          <div style={styles.card}>
            <p>Total Sales</p>
            <h3>{sales.length}</h3>
          </div>

          <div style={styles.card}>
            <p>Tickets Sold</p>
            <h3>{totalTickets}</h3>
          </div>

          <div style={styles.card}>
            <p>Total Income</p>
            <h3>₹{totalIncome.toFixed(2)}</h3>
          </div>

        </div>

        
        <table style={styles.table}>

          <thead>
            <tr>
              <th>Date</th>
              <th>Buyer</th>
              <th>Phone</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>
                  {sale.createdAt
                    ? new Date(sale.createdAt).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>{sale.buyerName}</td>

                <td>{sale.buyerPhone}</td>

                <td>{sale.ticketType}</td>

                <td>{sale.quantity}</td>

                <td>{sale.paymentMethod}</td>

                <td>{sale.paymentStatus}</td>

                <td>
                  {toNumber(sale.totalAmount).toFixed(2)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {sales.length === 0 && (
          <p>No sales found</p>
        )}

      </div>
    </div>
  );
}

export default Report;