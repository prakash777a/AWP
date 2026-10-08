import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Ticket, MapPin, Calendar, Users, CreditCard, ExternalLink } from 'lucide-react';
import './BookingConfirmation.css'; // Will be empty

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const payment = location.state?.payment;

  if (!booking || !payment) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--background)' }}>
        <div style={{ background: 'var(--surface)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>No confirmation data found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>We couldn't find the details for your recent booking.</p>
          <Link to="/packages" className="btn btn-primary">Browse Packages</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          
          <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#f0fdf4', borderBottom: '1px solid #bbf7d0' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={40} />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
            <p style={{ color: '#15803d', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              Your tour package has been booked and payment is complete. Pack your bags for an amazing adventure!
            </p>
          </div>
          
          <div style={{ padding: '2.5rem' }}>
            <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  <Ticket size={16} /> Booking Details
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Booking ID</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>#{booking.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status</div>
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#dcfce7', color: '#16a34a', borderRadius: '100px', fontWeight: 600, fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    CONFIRMED
                  </div>
                </div>
              </div>
              
              <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  <CreditCard size={16} /> Payment Receipt
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Transaction Ref</div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--primary)', fontFamily: 'monospace' }}>{payment.transactionReference}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Amount Paid ({payment.paymentMethod?.replace('_', ' ')})</div>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--success)', marginTop: '0.25rem' }}>
                    ₹{Number(payment.amount).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Trip Itinerary Snapshot
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 119, 182, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Package & Destination</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary)' }}>{booking.tourPackage?.title}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{booking.tourPackage?.destinationName}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 119, 182, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Travel Date</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary)' }}>
                    {new Date(booking.travelDate).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 119, 182, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Travelers</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary)' }}>
                    {booking.numberOfTravelers} Person{booking.numberOfTravelers > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#b45309', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              <strong>Note:</strong> This is a simulated booking for academic purposes only. No real service is booked.
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/my-bookings" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                View My Bookings
              </Link>
              <Link to="/packages" className="btn btn-outline" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Browse More <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
