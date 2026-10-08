import React, { useEffect, useState } from 'react';
import { Users, Package, MapPin, CalendarCheck, TrendingUp } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: null,
    packages: null,
    destinations: null,
    bookings: null,
    revenue: null,
    bookingStatuses: { PENDING: 0, CONFIRMED: 0, CANCELLED: 0, COMPLETED: 0 }
  });
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const newStats = { users: null, packages: null, destinations: null, bookings: null, revenue: 0, bookingStatuses: { PENDING: 0, CONFIRMED: 0, CANCELLED: 0, COMPLETED: 0 } };
      const newErrors = {};

      try {
        const usersResp = await api.get('/users');
        newStats.users = Array.isArray(usersResp.data) ? usersResp.data.length : 'N/A';
      } catch (e) { newErrors.users = true; newStats.users = 'N/A'; }

      try {
        const pkgResp = await api.get('/packages');
        newStats.packages = Array.isArray(pkgResp.data) ? pkgResp.data.length : 'N/A';
      } catch (e) { newErrors.packages = true; newStats.packages = 'N/A'; }

      try {
        const destResp = await api.get('/destinations');
        newStats.destinations = Array.isArray(destResp.data) ? destResp.data.length : 'N/A';
      } catch (e) { newErrors.destinations = true; newStats.destinations = 'N/A'; }

      try {
        const bookingsResp = await api.get('/bookings');
        const allBookings = Array.isArray(bookingsResp.data) ? bookingsResp.data : [];
        newStats.bookings = allBookings.length;
        
        let totalRev = 0;
        allBookings.forEach(b => {
           if (b.status !== 'CANCELLED' && b.payment) {
              totalRev += Number(b.totalAmount);
           }
           if (newStats.bookingStatuses[b.status] !== undefined) {
              newStats.bookingStatuses[b.status]++;
           }
        });
        newStats.revenue = totalRev;
      } catch (e) { newErrors.bookings = true; newStats.bookings = 'N/A'; newStats.revenue = 'N/A'; }

      setStats(newStats);
      setError(newErrors);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Users', value: stats.users, color: '#3b82f6', bg: '#eff6ff', icon: Users },
    { label: 'Total Packages', value: stats.packages, color: '#10b981', bg: '#ecfdf5', icon: Package },
    { label: 'Total Bookings', value: stats.bookings, color: '#8b5cf6', bg: '#f5f3ff', icon: CalendarCheck },
    { label: 'Total Revenue (₹)', value: stats.revenue !== 'N/A' && stats.revenue !== null ? stats.revenue.toLocaleString('en-IN') : stats.revenue, color: '#f59e0b', bg: '#fffbeb', icon: TrendingUp },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>Welcome back, here's what's happening today.</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem'
      }}>
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{ 
              background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem',
              transition: 'transform 0.2s', cursor: 'default'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {card.label}
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                  {card.value === null ? <span className="animate-pulse" style={{ color: '#cbd5e1' }}>--</span> : card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp color="var(--secondary)" size={20} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Booking Status Distribution</h2>
          </div>
          <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            {['PENDING', 'CONFIRMED', 'CANCELLED'].map((status) => {
              const count = stats.bookingStatuses[status];
              const total = stats.bookings || 1; // avoid division by zero
              const percentage = (count / total) * 100 || 0;
              let barColor = status === 'CONFIRMED' ? 'var(--success)' : status === 'CANCELLED' ? 'var(--danger)' : 'var(--warning)';
              
              return (
                <div key={status} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{status}</span>
                    <span style={{ color: 'var(--primary)' }}>{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: barColor, transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin color="var(--secondary)" size={20} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>System Management</h2>
          </div>
          <div style={{ padding: '2rem' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Use the sidebar to manage <strong>Packages</strong>, <strong>Destinations</strong>, <strong>Bookings</strong>, <strong>Users</strong>, and <strong>Reviews</strong>.
            </p>
            <div style={{ display: 'inline-block', padding: '0.75rem 1rem', background: 'rgba(0, 119, 182, 0.05)', border: '1px solid rgba(0, 119, 182, 0.2)', borderRadius: 'var(--border-radius-md)', color: 'var(--secondary)', fontSize: '0.9rem' }}>
              All statistics and data are retrieved live from the database. New bookings and user registrations will update automatically upon page refresh.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
