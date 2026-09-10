import Link from "next/link";

export default function AdminRoomsPage() {
  const rooms = [
    { id: 1, title: "Ocean View Suite", price: 450, status: "Active" },
    { id: 2, title: "City Penthouse", price: 850, status: "Active" },
    { id: 3, title: "Cozy Studio", price: 150, status: "Maintenance" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ margin: 0 }}>Room Management</h1>
        <button className="btn btn-primary">Add New Room</button>
      </div>

      <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-sm)' }}>ID</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Room Title</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Price/Night</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Status</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-sm)' }}>#{room.id}</td>
                <td style={{ padding: 'var(--spacing-sm)' }}>{room.title}</td>
                <td style={{ padding: 'var(--spacing-sm)' }}>${room.price}</td>
                <td style={{ padding: 'var(--spacing-sm)' }}>
                  <span style={{ 
                    color: room.status === 'Active' ? 'var(--color-success)' : '#F59E0B'
                  }}>
                    {room.status}
                  </span>
                </td>
                <td style={{ padding: 'var(--spacing-sm)' }}>
                  <button className="btn btn-outline" style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: '0.875rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
