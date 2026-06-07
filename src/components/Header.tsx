import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/home');
  };

  const handleShowShoppingList = () => {
    const now = new Date().toDateString();
    navigate(`/shopping-list/${now}/${now}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="header-logo">
          <DirectionsBikeIcon className="logo-icon" />
          <span className="logo-text">
            Cycle<span className="logo-accent">2</span>Go
          </span>
        </a>

        <nav className={`header-nav ${mobileOpen ? 'open' : ''}`}>
          <Link to="/home" className={isActive('/home') ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/tariffs" className={isActive('/tariffs') ? 'nav-link active' : 'nav-link'}>
            Our Cycles
          </Link>
          <Link to="/faq" className={isActive('/faq') ? 'nav-link active' : 'nav-link'}>
            Policies
          </Link>
          {user && (
            <Link to="/my-bookings" className={isActive('/my-bookings') ? 'nav-link active' : 'nav-link'}>
              My Bookings
            </Link>
          )}
          <div className="nav-divider" />
          {!user ? (
            <button className="nav-auth-btn" onClick={() => navigate('/auth')}>
              Login / Sign Up
            </button>
          ) : (
            <div className="nav-user-menu">
              <button className="nav-user-trigger">
                <AccountCircleIcon fontSize="small" />
                <span>{user.displayName?.split(' ')[0] || 'Account'}</span>
              </button>
              <div className="nav-user-dropdown">
                <Link to="/my-bookings" className="dropdown-item">My Bookings</Link>
                <button className="dropdown-item dropdown-item--btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>

        <div className="header-actions">
          {user && (
            <button className="cart-btn" onClick={handleShowShoppingList} title="Ride Plan">
              <ShoppingCartIcon fontSize="small" />
              <span className="cart-label">Ride Plan</span>
            </button>
          )}
          <button className="book-now-btn" onClick={() => navigate('/tariffs')}>
            Book a Cycle
          </button>
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
    </header>
  );
};

export default Header;
