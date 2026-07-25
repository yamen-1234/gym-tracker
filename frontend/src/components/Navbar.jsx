import { Link } from 'react-router-dom';
import { LogoMark } from './Illustrations';
import Button from './Button';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <LogoMark className="navbar__logo-icon" />
          <span>Gym Tracker</span>
        </Link>

        <nav className="navbar__links">
          <a href="#tracker">Tracker</a>
          <a href="#graphs">Progress</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
        </nav>

        <Link to="/auth?mode=login">
          <Button variant="secondary">Log in</Button>
        </Link>
      </div>
    </header>
  );
}
