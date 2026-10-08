import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, MapPin, CalendarCheck, Users, Star, MoveLeft } from 'lucide-react';

const AdminSidebar = () => {
  const activeStyle = { background: 'rgba(255,255,255,0.1)', color: 'white', borderLeft: '3px solid white' };
  const getStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', 
    color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'var(--transition-fast)',
    ...(isActive ? activeStyle : {})
  });

  return (
    <aside style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapPin size={18} color="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>TourVista Admin</h2>
      </div>
      
      <nav style={{ flex: 1, padding: '1.5rem 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li>
            <NavLink to="/admin" end style={getStyle}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/packages" style={getStyle}>
              <Package size={20} /> Packages
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/destinations" style={getStyle}>
              <MapPin size={20} /> Destinations
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/bookings" style={getStyle}>
              <CalendarCheck size={20} /> Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" style={getStyle}>
              <Users size={20} /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reviews" style={getStyle}>
              <Star size={20} /> Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <MoveLeft size={16} /> Back to Public Site
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
