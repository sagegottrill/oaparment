export default function AdminBookingsPage() {
  const bookings = [
    { id: "BKG-1042", guest: "John Doe", room: "Ocean View Suite", dates: "Oct 12 - Oct 15", amount: 1350, status: "Confirmed" },
    { id: "BKG-1043", guest: "Jane Smith", room: "City Penthouse", dates: "Oct 18 - Oct 20", amount: 1700, status: "Pending" },
    { id: "BKG-1044", guest: "Alice Johnson", room: "Cozy Studio", dates: "Oct 22 - Oct 25", amount: 450, status: "Cancelled" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-xl)" }}>Bookings Management</h1>

      <div className="card" style={{ padding: "var(--spacing-lg)" }}>
        <div className="table-wrap">
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "var(--spacing-sm)" }}>Booking ID</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Guest</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Room</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Dates</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Status</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "var(--spacing-sm)" }}>{booking.id}</td>
                  <td style={{ padding: "var(--spacing-sm)" }}>{booking.guest}</td>
                  <td style={{ padding: "var(--spacing-sm)" }}>{booking.room}</td>
                  <td style={{ padding: "var(--spacing-sm)" }}>{booking.dates}</td>
                  <td style={{ padding: "var(--spacing-sm)" }}>${booking.amount}</td>
                  <td style={{ padding: "var(--spacing-sm)" }}>
                    <span
                      style={{
                        color:
                          booking.status === "Confirmed"
                            ? "var(--color-success)"
                            : booking.status === "Pending"
                              ? "#F59E0B"
                              : "var(--color-error)",
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: "var(--spacing-sm)" }}>
                    <div className="flex gap-sm" style={{ flexWrap: "wrap" }}>
                      {booking.status === "Pending" && (
                        <button className="btn btn-primary" style={{ padding: "var(--spacing-xs) var(--spacing-sm)", fontSize: "0.875rem" }}>
                          Confirm
                        </button>
                      )}
                      {booking.status !== "Cancelled" && (
                        <button
                          className="btn btn-outline"
                          style={{
                            padding: "var(--spacing-xs) var(--spacing-sm)",
                            fontSize: "0.875rem",
                            color: "var(--color-error)",
                            borderColor: "var(--color-error)",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
