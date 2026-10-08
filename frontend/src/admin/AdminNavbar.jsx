import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ 
      height: '70px', background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem',
      flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* We can add a mobile menu toggle later, hidden on desktop for now */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: 'var(--text-secondary)' }}>
          <Menu size={24} />
        </button>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0, 119, 182, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>{user?.fullName || 'Admin'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Administrator</div>
          </div>
        </div>
        
        <div style={{ width: '1px', height: '30px', background: 'var(--border)' }}></div>
        
        <button 
          onClick={logout} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', 
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
