import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const resp = await api.get('/bookings/my-bookings'); // Adjust endpoint if needed
        setBookings(Array.isArray(resp.data) ? resp.data : []);
      } catch (error) {
        console.error("Error fetching my bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <h2>No bookings found.</h2>
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(b => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>{b.tourPackage?.title || 'Tour Package'}</h3>
                <span className={`booking-status status-${b.status.toLowerCase()}`}>{b.status}</span>
              </div>
              <div className="booking-details">
                <p><strong>Booking ID:</strong> {b.id}</p>
                <p><strong>Travel Date:</strong> {b.travelDate || 'TBD'}</p>
                <p><strong>Total Amount:</strong> ₹{b.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
