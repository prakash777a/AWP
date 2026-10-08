import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Landmark, ShieldCheck, ArrowRight, Loader2, Calendar, MapPin, Users } from 'lucide-react';
import api from '../services/api';
import './Payment.css'; // Will be cleaned later

const PAYMENT_METHODS = [
  { value: 'CARD', label: 'Credit / Debit Card', description: 'Visa, Mastercard, Amex', icon: CreditCard },
  { value: 'UPI', label: 'UPI / QR Code', description: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
  { value: 'NET_BANKING', label: 'Net Banking', description: 'All major banks supported', icon: Landmark },
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!booking) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', backgroundColor: 'var(--background)' }}>
        <div style={{ background: 'var(--surface)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center', maxWidth: '500px' }}>
          <ShieldCheck size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--text-secondary)', opacity: 0.5 }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>No booking selected</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please start your booking process from a package page.</p>
          <button className="btn btn-primary" onClick={() => navigate('/packages')}>Browse Packages</button>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resp = await api.post('/payments', {
        bookingId: booking.id,
        paymentMethod: selectedMethod,
      });

      navigate('/booking-confirmation', {
        state: { booking, payment: resp.data },
        replace: true,
      });
    } catch (err) {
      console.error('Payment error', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Secure Checkout</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>
            <ShieldCheck size={18} /> SIMULATED SECURE PAYMENT
          </div>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '2rem', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--primary)' }}>Select Payment Method</h3>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {PAYMENT_METHODS.map(method => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.value;
                    return (
                      <div
                        key={method.value}
                        onClick={() => setSelectedMethod(method.value)}
                        style={{ 
                          display: 'flex', alignItems: 'center', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', transition: 'var(--transition-fast)',
                          border: `2px solid ${isSelected ? 'var(--secondary)' : 'var(--border)'}`,
                          background: isSelected ? 'rgba(0, 119, 182, 0.03)' : 'var(--surface)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: isSelected ? 'rgba(0, 119, 182, 0.1)' : 'var(--background)', color: isSelected ? 'var(--secondary)' : 'var(--text-secondary)', marginRight: '1rem' }}>
                          <Icon size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.25rem' }}>{method.label}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{method.description}</div>
                        </div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isSelected ? 'var(--secondary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--secondary)' }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'sticky', top: '2rem' }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--primary)' }}>Booking Summary</h3>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {booking.tourPackage?.title}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <MapPin size={18} color="var(--text-secondary)" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{booking.tourPackage?.destinationName}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Calendar size={18} color="var(--text-secondary)" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      {new Date(booking.travelDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Users size={18} color="var(--text-secondary)" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      {booking.numberOfTravelers} Traveler(s)
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', fontWeight: 800, fontSize: '1.35rem', color: 'var(--primary)' }}>
                  <span>Total Amount</span>
                  <span>₹{Number(booking.totalAmount).toLocaleString('en-IN')}</span>
                </div>
                
                {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}
                
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', background: 'var(--success)' }}
                  onClick={handlePay}
                  disabled={loading || !selectedMethod}
                >
                  {loading ? (
                    <><Loader2 size={20} className="animate-spin" /> Processing...</>
                  ) : (
                    <>Pay ₹{Number(booking.totalAmount).toLocaleString('en-IN')} <ArrowRight size={20} /></>
                  )}
                </button>
                
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                  This is a simulated academic payment system. No real money is charged.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Payment;
