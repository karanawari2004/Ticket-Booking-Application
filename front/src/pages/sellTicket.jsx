import { useEffect, useState } from "react";
import API from "../config/api";
import styles from "../styles/sellTicketStyles";

function SellTicket() {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);

  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API}/v1/on-ground/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setEvents(data.events);

        if (data.events.length > 0) {
          setEvent(data.events[0]);
        }
      } catch (error) {
        setMessage( "Failed to get events");
      }
    };

    getEvents();
  }, []);

  const sellTicket = async (paymentMethod) => {
    try {
      setMessage("");

      if (!event) {
        setMessage("Please select an event");
        return;
      }

      if (!ticketType) {
        setMessage("Please enter ticket type");
        return;
      }

      if (!buyerName || !buyerPhone) {
        setMessage("Buyer name and phone are required");
        return;
      }

      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${API}/v1/on-ground/tickets/${
          paymentMethod === "cash" ? "cash" : "payment-link"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventid: event._id,
            tickettypeid: ticketType,
            noofticket: Number(quantity),
            buyername: buyerName,
            buyerphone: buyerPhone,
            buyeremail: buyerEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message || "Ticket sold successfully");

      setBuyerName("");
      setBuyerPhone("");
      setBuyerEmail("");
      setTicketType("");
      setQuantity(1);
    } catch (error) {
      setMessage(error.message || "Sale failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Sell Ticket</h2>
          <p style={styles.subtitle}>
            Create an on-ground ticket sale
          </p>
        </div>

        <div style={styles.form}>
          <label style={styles.label}>Event</label>

          <select
            value={event?._id || ""}
            onChange={(e) => {
              const selectedEvent = events.find(
                (item) => item._id === e.target.value
              );

              setEvent(selectedEvent);
            }}
            style={styles.input}
          >
            {events.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name || item.title}
              </option>
            ))}
          </select>

          {event && (
            <div style={styles.priceBox}>
              <span style={styles.priceLabel}>Ticket Price</span>

              <span style={styles.price}>
                ₹{event.ticketPrice || 0}
              </span>
            </div>
          )}

          <label style={styles.label}>Ticket Type</label>

          <input
            type="text"
            placeholder="VIP / Regular"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Buyer Name</label>

          <input
            type="text"
            placeholder="Enter buyer name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Buyer Phone</label>

          <input
            type="text"
            placeholder="Enter phone number"
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Buyer Email</label>

          <input
            type="email"
            placeholder="Enter email address"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            style={styles.input}
          />

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}

          <div style={styles.buttons}>
            <button
              onClick={() => sellTicket("cash")}
              style={styles.cash}
            >
              Sell for Cash
            </button>

            <button
              onClick={() => sellTicket("link")}
              style={styles.payment}
            >
              Send Payment Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellTicket;