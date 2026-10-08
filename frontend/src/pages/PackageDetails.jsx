import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, XCircle, Calendar, Users, IndianRupee, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './PackageDetails.css'; // Will be empty

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const resp = await api.get(`/packages/${id}`);
        setPkg(resp.data);
      } catch (err) {
        console.error('Error fetching package details', err);
        setError('Package not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const calculatedTotal = pkg ? (pkg.price * numberOfTravelers).toFixed(2) : 0;

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: `/packages/${id}` } });
      return;
    }
    setShowBookingForm(true);
    setBookingError(null);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);

    try {
      const resp = await api.post('/bookings', {
        packageId: Number(id),
        travelDate,
        numberOfTravelers: Number(numberOfTravelers),
      });
      toast.success('Proceeding to payment...');
      navigate('/payment', { state: { booking: resp.data } });
    } catch (err) {
      console.error('Booking error', err);
      const errMsg = err.response?.data?.message || 'Failed to create booking. Please try again.';
      setBookingError(errMsg);
      toast.error(errMsg);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="container section">
      <div className="form-error">{error}</div>
      <Link to="/packages" className="btn btn-outline" style={{ marginTop: '1rem' }}>Back to Packages</Link>
    </div>
  );
  
  if (!pkg) return null;

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <Link to="/packages" className="btn btn-ghost" style={{ padding: '0', display: 'inline-flex', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            &larr; Back to all packages
          </Link>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--primary)' }}>{pkg.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem', gap: '0.5rem' }}>
                <MapPin size={18} /> {pkg.destination?.name || 'Multiple Destinations'}
              </div>
            </div>
            
            <div style={{ textAlign: 'right', background: 'var(--surface)', padding: '1rem 1.5rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Starting from</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                ₹{Number(pkg.price).toLocaleString('en-IN')}
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}> / person</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', height: '60vh', minHeight: '400px', backgroundColor: '#e9ecef', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', marginBottom: '3rem', boxShadow: 'var(--shadow-md)' }}>
            {pkg.imageUrl ? (
              <img src={pkg.imageUrl} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                <ImageIcon size={64} opacity={0.5} />
              </div>
            )}
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
            
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--surface)', padding: '1rem 1.5rem', borderRadius: 'var(--border-radius-md)', flex: '1 1 200px', boxShadow: 'var(--shadow-sm)' }}>
                  <Clock size={24} color="var(--secondary)" />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Duration</div>
                    <div style={{ fontWeight: 600 }}>{pkg.durationDays} Days</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--surface)', padding: '1rem 1.5rem', borderRadius: 'var(--border-radius-md)', flex: '1 1 200px', boxShadow: 'var(--shadow-sm)' }}>
                  {pkg.available ? <CheckCircle size={24} color="var(--success)" /> : <XCircle size={24} color="var(--danger)" />}
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Availability</div>
                    <div style={{ fontWeight: 600, color: pkg.available ? 'var(--success)' : 'var(--danger)' }}>
                      {pkg.available ? 'Available Now' : 'Sold Out'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                  About This Package
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {pkg.description || 'No detailed description provided for this package.'}
                </p>
              </div>
            </div>

            <div style={{ position: 'sticky', top: '100px' }}>
              {!showBookingForm ? (
                <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Book this tour</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Price</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>₹{Number(pkg.price).toLocaleString('en-IN')}</strong>
                  </div>
                  
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                    onClick={handleBookNow}
                    disabled={!pkg.available}
                  >
                    {!pkg.available ? 'Currently Unavailable' : (!user ? 'Login to Book' : 'Book Now')}
                  </button>
                  
                  {!user && (
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      Don't have an account? <Link to="/register" style={{ color: 'var(--secondary)' }}>Sign up</Link>
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                    Complete booking
                  </h3>

                  {bookingError && <div className="form-error">{bookingError}</div>}

                  <form onSubmit={handleSubmitBooking}>
                    <div className="form-group">
                      <label className="form-label">Travel Date</label>
                      <div style={{ position: 'relative' }}>
                        <Calendar size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                        <input
                          type="date"
                          className="form-control"
                          style={{ paddingLeft: '2.75rem' }}
                          required
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          value={travelDate}
                          onChange={e => setTravelDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Travelers</label>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--background)', padding: '0.5rem', borderRadius: 'var(--border-radius-md)' }}>
                        <button type="button" onClick={() => setNumberOfTravelers(prev => Math.max(1, prev - 1))} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', lineHeight: 1 }}>-</button>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{numberOfTravelers}</span>
                        <button type="button" onClick={() => setNumberOfTravelers(prev => Math.min(10, prev + 1))} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', lineHeight: 1 }}>+</button>
                      </div>
                    </div>

                    <div style={{ background: 'var(--background)', borderRadius: 'var(--border-radius-md)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <span>₹{Number(pkg.price).toLocaleString('en-IN')} × {numberOfTravelers} traveler(s)</span>
                        <span>₹{Number(calculatedTotal).toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)', borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                        <span>Total</span>
                        <span>₹{Number(calculatedTotal).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '0.5rem' }}
                      disabled={bookingLoading}
                    >
                      {bookingLoading ? 'Processing...' : 'Book Now'}
                    </button>
                    
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ width: '100%' }}
                      onClick={() => { setShowBookingForm(false); setBookingError(null); }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Reviews Section */}
          <div style={{ marginTop: '4rem', background: 'var(--surface)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
             <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary)' }}>Traveler Reviews</h3>
             {pkg.reviews && pkg.reviews.length > 0 ? (
               <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
                 {pkg.reviews.map(review => (
                   <div key={review.id} style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)' }}>
                     <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--warning)', marginBottom: '1rem' }}>
                       {[...Array(5)].map((_, i) => (
                         <CheckCircle key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "var(--border)"} />
                       ))}
                     </div>
                     <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>"{review.comment}"</p>
                     <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>- Traveler {review.userId}</div>
                   </div>
                 ))}
               </div>
             ) : (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--background)', borderRadius: 'var(--border-radius-md)' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to share your experience!</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
