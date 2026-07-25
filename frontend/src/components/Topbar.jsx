import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './Topbar.css';

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="topbar">
      <Button variant="primary" onClick={() => navigate('/dashboard/tracker')}>
        <i className="fa-solid fa-plus"></i>&nbsp; Log a workout
      </Button>

      <div className="topbar__actions">
        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle light/dark theme"
        >
          <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>

        <button className="topbar__icon-btn" aria-label="Notifications" title="Notifications">
          <i className="fa-solid fa-bell"></i>
        </button>

        <div className="topbar__profile" ref={menuRef}>
          <button
            className="topbar__avatar"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Account menu"
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </button>

          {menuOpen && (
            <div className="topbar__dropdown squircle">
              <div className="topbar__dropdown-user">
                <strong>{user?.username}</strong>
                <span>{user?.email}</span>
              </div>
              <button onClick={() => navigate('/dashboard/settings')}>
                <i className="fa-solid fa-gear"></i> Account settings
              </button>
              <button onClick={handleLogout} className="topbar__logout">
                <i className="fa-solid fa-right-from-bracket"></i> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
