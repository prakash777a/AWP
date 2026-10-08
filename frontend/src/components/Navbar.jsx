import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Map, User, LogOut, Compass, Briefcase } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Map className="mb-0" strokeWidth={2.5} size={28} color="var(--secondary)" />
          Tour<span>Vista</span>
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <Menu size={24} />
        </button>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/destinations" className={`nav-link ${location.pathname === '/destinations' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Destinations
          </Link>
          <Link to="/packages" className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Packages
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className={`navbar-actions ${mobileMenuOpen ? 'stack-on-mobile mt-4' : ''}`} style={{ display: mobileMenuOpen ? 'flex' : '' }}>
          <Link to="/packages" className="btn btn-ghost" style={{ padding: '0.5rem' }} onClick={() => setMobileMenuOpen(false)}>
            <Compass size={20} />
          </Link>
          
          {!user && (
            <>
              <Link to="/login" className="btn btn-ghost" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}

          {user && user.role === 'CUSTOMER' && (
            <>
              <Link to="/my-bookings" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                <Briefcase size={18} /> Bookings
              </Link>
              <Link to="/profile" className="btn btn-ghost" onClick={() => setMobileMenuOpen(false)}>
                <User size={18} /> Profile
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-ghost" style={{color: 'var(--danger)'}}>
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          {user && user.role === 'ADMIN' && (
            <>
              <Link to="/admin" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-ghost" style={{color: 'var(--danger)'}}>
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
