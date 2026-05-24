import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer footer--dark">
      <div className="container">
        <div className="footer__inner">
          <a href="/" className="footer__textLogo">
            <b>
              Cycle<span style={{ color: '#ffad00' }}>2</span>Go
            </b>
          </a>

          <div className="footer__data">
            <div className="footer__data__item">
              <div className="footer__row">
                <b>Address:</b>
                <br />
                Near Silk Board, #461, <br />
                Sai Sobagu, Basement, Outer Ring Road,
                <br />
                Teachers Colony, Near Silk Board, Koramangala, <br />
                HSR Layout, Bengaluru, Karnataka 560034
              </div>
            </div>
            <div className="footer__data__item">
              <div className="footer__row">
                <b>Contacts:</b>
                <br />
                Email: support@gaadi2go.com
                <br />
                Phone: +91 8884170822
                <br />
              </div>
            </div>
            <div className="footer__data__item">
              <div className="footer__row">
                <a
                  href="https://www.youtube.com/channel/UCuW0N3SLGXlAWvNYdN7d8tw"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  YouTube
                </a>
              </div>
              <div className="footer__row">
                <a
                  href="https://www.facebook.com/cycle2go/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
