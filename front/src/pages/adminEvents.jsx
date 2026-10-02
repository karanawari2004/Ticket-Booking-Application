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

      const response = await fetch(
        `${API}/v1/on-ground/events`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get events"
        );
      }

      setEvents(data.events || data);
    } catch (error) {
      setMessage(
        error.message || "Failed to get events"
      );
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
      const response = await fetch(
        `${API}/v1/on-ground/events`,
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create event"
        );
      }

      setName("");
      setTitle("");
      setTicketPrice("");
      setIsActive(false);

      setMessage("Event created successfully");

      getEvents();
    } catch (error) {
      setMessage(
        error.message || "Failed to create event"
      );
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
        throw new Error(
          data.message || "Unable to delete event"
        );
      }

      setMessage("Event deleted successfully");

      getEvents();
    } catch (error) {
      setMessage(
        error.message || "Failed to delete event"
      );
    }
  };

  return (
    <div className="admin-events-page" style={styles.layout}>
      <main style={styles.main}>

        {/* Add Event */}
        <div className="admin-grid" style={styles.page}>
          <div style={styles.card}>

            <h2 style={styles.heading}>
              Add Event
            </h2>

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >

              <div>
                <label style={styles.label}>
                  Event name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter event name"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Event title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter event title"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Ticket price
                </label>

                <input
                  type="number"
                  min="0"
                  value={ticketPrice}
                  onChange={(e) =>
                    setTicketPrice(e.target.value)
                  }
                  placeholder="Enter ticket price"
                  style={styles.input}
                />
              </div>

              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) =>
                    setIsActive(e.target.checked)
                  }
                />

                Active event
              </label>

              <button
                type="submit"
                style={styles.button}
              >
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

          {/* All Events */}
          <div style={styles.eventsCard}>

            <h2 style={styles.heading}>
              All Events
            </h2>

            {loading ? (
              <p style={styles.info}>
                Loading events...
              </p>
            ) : events.length === 0 ? (
              <p style={styles.info}>
                No events found.
              </p>
            ) : (
              <div style={styles.tableBox}>

                <table style={styles.table}>

                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>
                        ID
                      </th>

                      <th style={styles.tableHeader}>
                        Name
                      </th>

                      <th style={styles.tableHeader}>
                        Title
                      </th>

                      <th style={styles.tableHeader}>
                        Ticket Price
                      </th>

                      <th style={styles.tableHeader}>
                        Active
                      </th>

                      <th style={styles.tableHeader}>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}>

                        <td style={styles.tableCell}>
                          {event._id}
                        </td>

                        <td style={styles.tableCell}>
                          {event.name}
                        </td>

                        <td style={styles.tableCell}>
                          {event.title}
                        </td>

                        <td style={styles.tableCell}>
                          ₹{event.ticketPrice}
                        </td>

                        <td style={styles.tableCell}>
                          {event.isActive
                            ? "Active"
                            : "Inactive"}
                        </td>

                        <td style={styles.tableCell}>

                          <button
                            onClick={() =>
                              handleDelete(event._id)
                            }
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

export default AdminEvents;