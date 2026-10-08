import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ type = 'spinner' }) => {
  if (type === 'skeleton-card') {
    return (
      <div className="card" style={{ height: '350px' }}>
        <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
        <div className="card-body">
          <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '1.5rem' }}></div>
          <div className="skeleton" style={{ height: '40px', width: '100%', marginTop: 'auto', borderRadius: '4px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
      <Loader2 size={48} className="animate-spin" style={{ marginBottom: '1rem', color: 'var(--secondary)' }} />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
