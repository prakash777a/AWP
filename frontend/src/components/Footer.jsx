import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="navbar-brand" style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>
              <MapPin strokeWidth={2.5} size={28} color="var(--secondary)" />
              Tour<span style={{ color: 'var(--secondary)' }}>Vista</span>
            </Link>
            <p className="footer-desc">
              Discover breathtaking destinations and create unforgettable memories with our premium travel services. Travel made simple and elegant.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/destinations" className="footer-link">Destinations</Link>
              <Link to="/packages" className="footer-link">Tour Packages</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Support</h4>
            <div className="footer-links">
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/" className="footer-link">Help Center</Link>
              <Link to="/" className="footer-link">Terms of Service</Link>
              <Link to="/" className="footer-link">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">FB</a>
              <a href="#" className="social-link">TW</a>
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">YT</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TourVista. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ cursor: 'pointer' }}>English (US)</span>
            <span style={{ cursor: 'pointer' }}>USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
