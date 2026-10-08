import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/users');
      setUsers(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>User Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        {loading ? (
          <div><SkeletonLoader type="table" /></div>
        ) : users.length === 0 ? (
          <EmptyState title="No users found" type="default" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: u.role === 'ADMIN' ? '#fde2e2' : '#def5e5',
                      color: u.role === 'ADMIN' ? '#d93025' : '#1e873d',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
