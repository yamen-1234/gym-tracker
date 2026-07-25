import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Tracker from './pages/Tracker';
import Analytics from './pages/Analytics';
import PersonalData from './pages/PersonalData';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="personal-data" element={<PersonalData />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
