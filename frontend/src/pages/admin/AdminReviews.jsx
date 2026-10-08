import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../context/ToastContext';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Note: No global GET /api/reviews endpoint yet. This will show empty state.
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // The backend uses /api/packages/{packageId}/reviews per package.
      // At admin level we attempt a general endpoint; if 404/403, show empty state.
      const resp = await api.get('/reviews');
      setReviews(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 403) {
        // No global review endpoint available yet - show empty state
        setReviews([]);
      } else {
        setError("Failed to load reviews.");
      }
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Review deleted successfully.');
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review.");
      console.error("Error deleting review", err);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>Review Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        {loading ? (
          <div><SkeletonLoader type="table" /></div>
        ) : reviews.length === 0 ? (
          <EmptyState title="No reviews found" type="reviews" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Package</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.user?.fullName || 'N/A'}</td>
                  <td>{r.tourPackage?.title || 'N/A'}</td>
                  <td>{'⭐'.repeat(Math.min(r.rating, 5))}</td>
                  <td>{r.comment}</td>
                  <td>
                    <button className="btn btn-logout" onClick={() => handleDelete(r.id)}>Delete</button>
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

export default AdminReviews;
