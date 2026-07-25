import { useAuth } from '../context/AuthContext';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem' }}>
        Welcome{user ? `, ${user.username}` : ''}
      </h1>
      <p style={{ marginTop: '0.5rem' }}>
        Stat cards, weight goal, volume graph, and the muscle heatmap land in Stage 4.
      </p>
    </div>
  );
}
