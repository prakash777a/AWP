import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../context/ToastContext';
import { Download } from 'lucide-react';

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

const STATUS_STYLES = {
  PENDING:   { bg: '#fef9c3', color: '#92400e' },
  CONFIRMED: { bg: '#dcfce7', color: '#16a34a' },
  CANCELLED: { bg: '#fee2e2', color: '#dc2626' },
  COMPLETED: { bg: '#e0f2fe', color: '#0369a1' },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/admin/bookings');
      setBookings(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings', err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await api.put(`/admin/bookings/${id}/status`, { status: newStatus });
      toast.success(`Booking #${id} status updated to ${newStatus}`);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCSV = () => {
    if (bookings.length === 0) {
      toast.warning('No bookings to export.');
      return;
    }
    const headers = ['ID', 'Customer', 'Email', 'Package', 'Destination', 'Date', 'Travelers', 'Amount', 'Payment', 'Status'];
    const csvRows = [headers.join(',')];
    
    bookings.forEach(b => {
      const formattedDate = b.travelDate ? new Date(b.travelDate).toISOString().split('T')[0] : 'N/A';
      const paymentMethod = b.payment ? b.payment.paymentMethod : 'Pending';
      const row = [
        b.id,
        `"${b.customer?.fullName || 'N/A'}"`,
        `"${b.customer?.email || 'N/A'}"`,
        `"${b.tourPackage?.title || 'N/A'}"`,
        `"${b.tourPackage?.destinationName || 'N/A'}"`,
        formattedDate,
        b.numberOfTravelers,
        b.totalAmount || 0,
        paymentMethod,
        b.status
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Bookings exported to CSV successfully');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Booking Management</h1>
        <button className="btn btn-outline" onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export CSV
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        {loading ? (
          <div><SkeletonLoader type="table" /></div>
        ) : bookings.length === 0 ? (
          <EmptyState type="bookings" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Travel Date</th>
                <th>Travelers</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => {
                const style = STATUS_STYLES[b.status] || STATUS_STYLES.PENDING;
                return (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.customer?.fullName || 'N/A'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{b.customer?.email}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.tourPackage?.title || 'N/A'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{b.tourPackage?.destinationName}</div>
                    </td>
                    <td>{b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN') : '—'}</td>
                    <td>{b.numberOfTravelers}</td>
                    <td>₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}</td>
                    <td>
                      {b.payment ? (
                        <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.85rem' }}>✅ {b.payment.paymentMethod?.replace('_',' ')}</span>
                      ) : (
                        <span style={{ color: '#dc2626', fontSize: '0.85rem' }}>⏳ Pending</span>
                      )}
                    </td>
                    <td>
                      <span style={{ background: style.bg, color: style.color, padding: '4px 10px', borderRadius: '12px', fontWeight: 600, fontSize: '0.8rem' }}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <select
                        defaultValue=""
                        onChange={e => {
                          if (e.target.value) handleStatusChange(b.id, e.target.value);
                          e.target.value = '';
                        }}
                        disabled={updatingId === b.id || b.status === 'CANCELLED' || b.status === 'COMPLETED'}
                        style={{ padding: '5px 8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '0.85rem' }}
                      >
                        <option value="">Update Status</option>
                        {STATUS_OPTIONS.filter(s => s !== b.status).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
