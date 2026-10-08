import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import './AccessDenied.css'; // Will be empty

const AccessDenied = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--background)' }}>
      <div style={{ background: 'var(--surface)', padding: '4rem 2rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', marginBottom: '1.5rem' }}>
          <ShieldAlert size={40} />
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--danger)', margin: '0 0 0.5rem', lineHeight: 1 }}>403</h1>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 1rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          You don't have permission to view this page or perform this action.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
