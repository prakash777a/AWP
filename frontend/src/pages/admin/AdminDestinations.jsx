import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../context/ToastContext';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState({ name: '', location: '', description: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/destinations');
      setDestinations(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching destinations", err);
      setError("Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (destination = null) => {
    if (destination) {
      setCurrentDestination(destination);
      setIsEditing(true);
    } else {
      setCurrentDestination({ name: '', location: '', description: '', imageUrl: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDestination({ name: '', location: '', description: '', imageUrl: '' });
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (isEditing) {
        await api.put(`/destinations/${currentDestination.id}`, currentDestination);
      } else {
        await api.post('/destinations', currentDestination);
      }
      toast.success(isEditing ? 'Destination updated successfully' : 'Destination added successfully');
      fetchDestinations();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving destination", err);
      toast.error(err.response?.data?.message || "Error saving destination");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    try {
      await api.delete(`/destinations/${id}`);
      toast.success("Destination deleted successfully");
      fetchDestinations();
    } catch (err) {
      console.error("Error deleting destination", err);
      toast.error(err.response?.data?.message || "Failed to delete destination. Packages might still exist.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Destination Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add Destination</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        {loading ? (
          <div><SkeletonLoader type="table" /></div>
        ) : destinations.length === 0 ? (
          <EmptyState title="No destinations found" type="default" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Packages</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.location || '—'}</td>
                  <td>{d.packageCount ?? 0}</td>
                  <td>
                    <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={() => handleOpenModal(d)}>Edit</button>
                    <button className="btn btn-logout" onClick={() => handleDelete(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Destination' : 'Add Destination'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Name</label>
                <input required type="text" value={currentDestination.name} onChange={e => setCurrentDestination({...currentDestination, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input required type="text" value={currentDestination.location} onChange={e => setCurrentDestination({...currentDestination, location: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea required rows="4" value={currentDestination.description} onChange={e => setCurrentDestination({...currentDestination, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={currentDestination.imageUrl || ''} onChange={e => setCurrentDestination({...currentDestination, imageUrl: e.target.value})} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>{formLoading ? 'Saving...' : 'Save'}</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={formLoading}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;
