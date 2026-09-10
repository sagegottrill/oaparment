export default function AdminDashboardPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Dashboard Overview</h1>
      
      <div className="grid grid-cols-3 gap-md" style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <div className="card" style={{ padding: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Total Bookings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: 'var(--spacing-xs) 0 0 0' }}>142</p>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Revenue (MTD)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: 'var(--spacing-xs) 0 0 0' }}>$45,200</p>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Occupancy Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: 'var(--spacing-xs) 0 0 0' }}>85%</p>
        </div>
      </div>
      
      <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Recent Bookings</h2>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-sm)' }}>Guest</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Room</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Dates</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Amount</th>
              <th style={{ padding: 'var(--spacing-sm)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: 'var(--spacing-sm)' }}>John Doe</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>Ocean View Suite</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>Oct 12 - Oct 15</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>$1,350</td>
              <td style={{ padding: 'var(--spacing-sm)' }}><span style={{ color: 'var(--color-success)' }}>Confirmed</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: 'var(--spacing-sm)' }}>Jane Smith</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>City Penthouse</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>Oct 18 - Oct 20</td>
              <td style={{ padding: 'var(--spacing-sm)' }}>$1,700</td>
              <td style={{ padding: 'var(--spacing-sm)' }}><span style={{ color: '#F59E0B' }}>Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
