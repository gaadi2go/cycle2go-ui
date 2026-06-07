import React from 'react';
import { Link } from 'react-router-dom';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col footer-col--brand">
              <a href="/" className="footer-logo">
                <DirectionsBikeIcon className="footer-logo-icon" />
                <span>Cycle<span className="footer-accent">2</span>Go</span>
              </a>
              <p className="footer-tagline">
                Bengaluru's most trusted bicycle rental and servicing company.
                Ride green, live healthy, explore the city on two wheels.
              </p>
              <div className="footer-social">
                <a
                  href="https://www.youtube.com/channel/UCuW0N3SLGXlAWvNYdN7d8tw"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label="YouTube"
                >
                  <i className="fa fa-youtube-play" />
                </a>
                <a
                  href="https://www.facebook.com/cycle2go/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label="Facebook"
                >
                  <i className="fa fa-facebook" />
                </a>
                <a
                  href="https://wa.me/918884170822"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label="WhatsApp"
                >
                  <i className="fa fa-whatsapp" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Our Services</h4>
              <ul className="footer-links">
                <li><Link to="/tariffs">Bicycle Rental</Link></li>
                <li><Link to="/home">Bicycle Servicing</Link></li>
                <li><Link to="/home">Corporate Events</Link></li>
                <li><Link to="/home">Cycling Trips</Link></li>
                <li><Link to="/tariffs">View All Cycles</Link></li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/tariffs">Tariffs</Link></li>
                <li><Link to="/faq">Policies</Link></li>
                <li><Link to="/my-bookings">My Bookings</Link></li>
                <li><Link to="/auth">Login / Sign Up</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <ul className="footer-contact-list">
                <li>
                  <LocationOnIcon fontSize="small" />
                  <span>
                    #461, Sai Sobagu, Basement, Outer Ring Road,<br />
                    Near Silk Board, Koramangala,<br />
                    HSR Layout, Bengaluru — 560034
                  </span>
                </li>
                <li>
                  <PhoneIcon fontSize="small" />
                  <a href="tel:+918884170822">+91 88841 70822</a>
                </li>
                <li>
                  <EmailIcon fontSize="small" />
                  <a href="mailto:support@gaadi2go.com">support@gaadi2go.com</a>
                </li>
                <li>
                  <AccessTimeIcon fontSize="small" />
                  <span>Mon – Sun: 7:00 AM – 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; {currentYear} Cycle2Go. All rights reserved.</p>
          <p>
            Made with love in Bengaluru &nbsp;|&nbsp;
            <a href="mailto:support@gaadi2go.com">support@gaadi2go.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
