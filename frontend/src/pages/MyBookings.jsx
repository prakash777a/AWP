import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import api from '../services/api';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import './MyBookings.css'; // Will be empty

const STATUS_STYLES = {
  PENDING:   { bg: '#fef9c3', color: '#92400e', label: 'Pending Payment', border: '#fde047' },
  CONFIRMED: { bg: '#dcfce7', color: '#16a34a', label: 'Confirmed', border: '#86efac' },
  CANCELLED: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled', border: '#fca5a5' },
  COMPLETED: { bg: '#e0f2fe', color: '#0369a1', label: 'Completed', border: '#7dd3fc' },
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/bookings/my');
      setBookings(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings', err);
      setError('Failed to load your bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancellingId(id);
    try {
      await api.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled successfully.');
      fetchMyBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not cancel this booking.');
    } finally {
      setCancellingId(null);
    }
  };

  const handlePayNow = (booking) => {
    navigate('/payment', { state: { booking } });
  };

  if (loading) return <Loading />;

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem 0 5rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>My Bookings</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Manage and view all your tour bookings</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10, paddingBottom: '4rem' }}>
        {error && <div className="form-error" style={{ marginBottom: '2rem' }}>{error}</div>}

        {bookings.length === 0 ? (
          <EmptyState 
            message="No bookings yet" 
            subMessage="You haven't booked any tour packages. Browse available packages to get started." 
            actionText="Browse Packages"
            actionLink="/packages"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(booking => {
              const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES.PENDING;
              const isPending = booking.status === 'PENDING';
              const isCancellable = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
              const hasPayment = !!booking.payment;

              return (
                <div key={booking.id} style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Booking ID #{booking.id.toString().padStart(5, '0')}
                    </div>
                    <div style={{ 
                      backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`,
                      padding: '0.35rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
                    }}>
                      {statusStyle.label}
                    </div>
                  </div>

                  <div style={{ display: 'flex', padding: '1.5rem', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ width: '200px', height: '140px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', flexShrink: 0, backgroundColor: '#f1f5f9' }}>
                      {booking.tourPackage?.imageUrl ? (
                        <img src={booking.tourPackage.imageUrl} alt={booking.tourPackage.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>No Image</div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                        <Link to={`/packages/${booking.tourPackage?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {booking.tourPackage?.title}
                        </Link>
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <MapPin size={16} /> {booking.tourPackage?.destinationName || 'N/A'}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          <Calendar size={18} color="var(--secondary)" /> 
                          {new Date(booking.travelDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          <Users size={18} color="var(--secondary)" /> 
                          {booking.numberOfTravelers} Traveler(s)
                        </div>
                      </div>

                      {hasPayment && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', border: '1px solid #bbf7d0' }}>
                          <CreditCard size={14} /> 
                          Paid via {booking.payment.paymentMethod?.replace('_', ' ')} (Ref: {booking.payment.transactionReference})
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Amount</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>₹{Number(booking.totalAmount).toLocaleString('en-IN')}</div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', width: '100%' }}>
                        <Link to={`/my-bookings/${booking.id}`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                          View Details <ChevronRight size={16} />
                        </Link>
                        
                        {isPending && !hasPayment && (
                          <button className="btn btn-primary" onClick={() => handlePayNow(booking)} style={{ background: 'var(--success)', borderColor: 'var(--success)' }}>
                            Pay Now
                          </button>
                        )}
                        
                        {isCancellable && (
                          <button 
                            className="btn btn-ghost" 
                            style={{ color: 'var(--danger)' }}
                            onClick={() => handleCancel(booking.id)}
                            disabled={cancellingId === booking.id}
                          >
                            {cancellingId === booking.id ? 'Processing...' : 'Cancel Booking'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
