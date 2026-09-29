import { useEffect, useState } from "react";
import API from "../config/api";
import styles from "../styles/adminStyles";

function AdminEvents() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all events
  const getEvents = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${API}/v1/on-ground/events`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to get events");
      }

      // If backend sends { events: [...] }
      // use data.events
      // Otherwise use data directly
      setEvents(data.events || data);
    } catch (error) {
      setMessage(error.message || "Failed to get events");
    } finally {
      setLoading(false);
    }
  };

  // Load events when page opens
  useEffect(() => {
    getEvents();
  }, []);

  // Create event
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API}/v1/on-ground/events`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name,
          title,
          ticketPrice: Number(ticketPrice),
          isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create event");
      }

      // Clear form
      setName("");
      setTitle("");
      setTicketPrice("");
      setIsActive(false);

      setMessage("Event created successfully");

      // Get latest events
      getEvents();
    } catch (error) {
      setMessage(error.message || "Failed to create event");
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setMessage("");

      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${API}/v1/on-ground/events/${eventId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete event");
      }

      setMessage("Event deleted successfully");

      // Get latest events
      getEvents();
    } catch (error) {
      setMessage(error.message || "Failed to delete event");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add Event</h2>

        {/* ADD EVENT FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Event name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event name"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Event title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Ticket price</label>

            <input
              type="number"
              min="0"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="Enter ticket price"
              style={styles.input}
            />
          </div>

          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />

            Active event
          </label>

          <button type="submit" style={styles.button}>
            Add Event
          </button>

          {message && (
            <p
              style={{
                ...styles.message,
                color: message.includes("success")
                  ? "green"
                  : "#b91c1c",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      {/* ALL EVENTS */}
      <div
        style={{
          ...styles.card,
          maxWidth: "1100px",
          marginTop: "30px",
          overflowX: "auto",
        }}
      >
        <h2 style={styles.heading}>All Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Ticket Price</th>
                <th style={tableHeaderStyle}>Active</th>
                <th style={tableHeaderStyle}>Created At</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td style={tableCellStyle}>
                    {event._id}
                  </td>

                  <td style={tableCellStyle}>
                    {event.name}
                  </td>

                  <td style={tableCellStyle}>
                    {event.title}
                  </td>

                  <td style={tableCellStyle}>
                    ₹{event.ticketPrice}
                  </td>

                  <td style={tableCellStyle}>
                    {event.isActive ? "Active" : "Inactive"}
                  </td>

                  <td style={tableCellStyle}>
                    {event.createdAt
                      ? new Date(event.createdAt).toLocaleString()
                      : "-"}
                  </td>

                  <td style={tableCellStyle}>
                    <button
                      onClick={() => handleDelete(event._id)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  background: "#f3f4f6",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  whiteSpace: "nowrap",
};

const deleteButtonStyle = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminEvents;