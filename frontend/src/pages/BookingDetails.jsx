import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Users, Clock, CreditCard, User, Mail, Phone, ExternalLink } from 'lucide-react';
import api from '../services/api';
import Loading from '../components/Loading';

const STATUS_STYLES = {
  PENDING:   { bg: '#fef9c3', color: '#92400e', label: 'Pending Payment', border: '#fde047' },
  CONFIRMED: { bg: '#dcfce7', color: '#16a34a', label: 'Confirmed', border: '#86efac' },
  CANCELLED: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled', border: '#fca5a5' },
  COMPLETED: { bg: '#e0f2fe', color: '#0369a1', label: 'Completed', border: '#7dd3fc' },
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const resp = await api.get(`/bookings/my/${id}`);
        setBooking(resp.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('You are not authorized to view this booking.');
        } else if (err.response?.status === 404) {
          setError('Booking not found.');
        } else {
          setError('Failed to load booking details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(true);
    try {
      const resp = await api.put(`/bookings/${id}/cancel`);
      setBooking(resp.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking.');
    } finally {
      setCancelling(false);
    }
  };

  const handlePayNow = () => {
    navigate('/payment', { state: { booking } });
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="container section">
      <div className="form-error">{error}</div>
      <Link to="/my-bookings" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        <ChevronLeft size={18} /> Back to My Bookings
      </Link>
    </div>
  );
  if (!booking) return null;

  const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES.PENDING;
  const isPending = booking.status === 'PENDING';
  const isCancellable = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
  const hasPayment = !!booking.payment;

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <Link to="/my-bookings" className="btn btn-ghost" style={{ padding: '0', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          <ChevronLeft size={18} /> Back to My Bookings
        </Link>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Booking Details</h1>
          <div style={{ 
            backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`,
            padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>
            {statusStyle.label}
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} color="var(--secondary)" /> Package Information
                </h3>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {booking.tourPackage?.imageUrl && (
                    <div style={{ width: '120px', height: '120px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={booking.tourPackage.imageUrl} alt={booking.tourPackage.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Tour Package</div>
                    <Link to={`/packages/${booking.tourPackage?.id}`} style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {booking.tourPackage?.title} <ExternalLink size={16} color="var(--text-secondary)" />
                    </Link>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      {booking.tourPackage?.destinationName}
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} color="var(--text-secondary)" />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Travel Date</div>
                          <div style={{ fontWeight: 600 }}>{new Date(booking.travelDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} color="var(--text-secondary)" />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Duration</div>
                          <div style={{ fontWeight: 600 }}>{booking.tourPackage?.durationDays} Days</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={18} color="var(--text-secondary)" />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Travelers</div>
                          <div style={{ fontWeight: 600 }}>{booking.numberOfTravelers} Person(s)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {hasPayment ? (
              <div style={{ background: '#f0fdf4', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #bbf7d0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px outset #bbf7d0', background: 'rgba(22, 163, 74, 0.05)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CreditCard size={20} /> Payment Details
                  </h3>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
                      <div style={{ fontWeight: 700, color: '#16a34a' }}>{booking.payment.paymentStatus}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Method</div>
                      <div style={{ fontWeight: 600 }}>{booking.payment.paymentMethod?.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</div>
                      <div style={{ fontWeight: 600 }}>
                        {booking.payment.paymentDate ? new Date(booking.payment.paymentDate).toLocaleDateString('en-IN') : '—'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ref Number</div>
                      <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>{booking.payment.transactionReference}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isPending && (
              <div style={{ background: '#fef9c3', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #fef08a', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ color: '#854d0e' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 700 }}>Payment Pending</h3>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>Your booking won't be confirmed until payment is completed.</p>
                </div>
                <button className="btn btn-primary" onClick={handlePayNow} style={{ background: '#ca8a04', color: 'white', border: 'none' }}>
                  Pay Now
                </button>
              </div>
            )}
            
            <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#b45309', fontSize: '0.9rem' }}>
              <strong>Note:</strong> This is a simulated booking system for academic purposes.
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--primary)' }}>Order Summary</h3>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Booking ID</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>#{booking.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Booked On</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('en-IN') : '—'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Price per person</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    ₹{Number(booking.tourPackage?.price).toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border)', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Travelers</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>x {booking.numberOfTravelers}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
                  <span>Total</span>
                  <span>₹{Number(booking.totalAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--primary)' }}>Customer Details</h3>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <User size={16} color="var(--text-secondary)" />
                  <span style={{ fontWeight: 500 }}>{booking.customer?.fullName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Mail size={16} color="var(--text-secondary)" />
                  <span style={{ color: 'var(--text-secondary)' }}>{booking.customer?.email}</span>
                </div>
                {booking.customer?.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Phone size={16} color="var(--text-secondary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{booking.customer?.phone}</span>
                  </div>
                )}
              </div>
            </div>
            
            {isCancellable && (
              <button
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={cancelling}
                style={{ width: '100%', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
