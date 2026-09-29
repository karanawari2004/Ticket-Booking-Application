import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
import styles from "../styles/sellTableStyles";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

function SellTable() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${API}/v1/on-ground/sales`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const validSales = (response.data.sales || []).filter(
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

    getSales();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h2>Sales Report</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Buyer Name</th>
              <th>Buyer Phone</th>
              <th>Ticket Type</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>

                <td>
                  {sale.eventId?.name ||
                    sale.eventId?.title ||
                    "-"}
                </td>

                <td>{sale.buyerName}</td>

                <td>{sale.buyerPhone}</td>

                <td>{sale.ticketType}</td>

                <td>{sale.quantity}</td>

                <td>
                  ₹{toNumber(sale.totalAmount).toFixed(2)}
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

export default SellTable;