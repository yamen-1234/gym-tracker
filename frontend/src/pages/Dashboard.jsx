import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: '4rem' }}>
      <h1>Dashboard</h1>
      <p style={{ marginTop: '1rem' }}>
        Welcome{user ? `, ${user.username}` : ''}. Sidebar, stats grid, and heatmap arrive in Stage 3 & 4.
      </p>
      <button onClick={logout} style={{ marginTop: '1.5rem' }}>
        Log out
      </button>
    </main>
  );
}
