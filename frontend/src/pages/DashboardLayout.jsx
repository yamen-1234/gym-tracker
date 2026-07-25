import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-shell__main">
        <Topbar />
        <div className="dashboard-shell__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
