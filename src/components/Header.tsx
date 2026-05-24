import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [responsive, setResponsive] = useState(false);

  const toggleNav = () => setResponsive((prev) => !prev);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/home');
  };

  const handleShowShoppingList = () => {
    const now = new Date().toDateString();
    navigate(`/shopping-list/${now}/${now}`);
  };

  return (
    <div className={`topnav ${responsive ? 'responsive' : ''}`} id="myTopnav">
      <div className="logo">
        <a href="/" className="navbar__logo">
          <b>
            Cycle<span style={{ color: '#ffad00' }}>2</span>Go
          </b>
        </a>
      </div>

      {user && (
        <a
          onClick={handleShowShoppingList}
          style={{ float: 'right', height: '56px', cursor: 'pointer' }}
        >
          <sup>Ride Plan</sup>
          <ShoppingCartIcon />
        </a>
      )}

      <div className="dropdown">
        {!user ? (
          <button className="dropbtn" onClick={() => navigate('/auth')}>
            Login/Sign Up
          </button>
        ) : (
          <button className="dropbtn" onClick={() => {}}>
            {user.displayName || 'User'}
            <i className="fa fa-caret-down" />
          </button>
        )}
        {user && (
          <div className="dropdown-content">
            <Link to="/my-bookings">My Bookings</Link>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        )}
      </div>

      <Link to="/faq">Policies</Link>
      <Link to="/tariffs">Tariffs</Link>
      <Link to="/home">Home</Link>

      <a
        style={{ fontSize: '15px', cursor: 'pointer' }}
        className="icon"
        onClick={toggleNav}
      >
        &#9776;
      </a>
    </div>
  );
};

export default Header;
