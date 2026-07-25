import { NavLink } from 'react-router-dom';
import { LogoMark } from './Illustrations';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', end: true, icon: 'fa-house', label: 'Home' },
  { to: '/dashboard/tracker', icon: 'fa-list-check', label: 'Tracker' },
  { to: '/dashboard/analytics', icon: 'fa-chart-line', label: 'Analytics' },
  { to: '/dashboard/personal-data', icon: 'fa-user', label: 'Personal data' },
  { to: '/dashboard/settings', icon: 'fa-gear', label: 'Account settings' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <LogoMark className="sidebar__logo-icon" />
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
            title={item.label}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span className="sidebar__tooltip">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
