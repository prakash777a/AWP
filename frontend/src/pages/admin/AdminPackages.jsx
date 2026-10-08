import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../context/ToastContext';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState({ 
    title: '', description: '', price: '', durationDays: '', imageUrl: '', available: true, destinationId: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchPackages();
    fetchDestinations();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/packages');
      setPackages(Array.isArray(resp.data) ? resp.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching packages", err);
      setError("Failed to load packages.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    try {
      const resp = await api.get('/destinations');
      setDestinations(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error("Error fetching destinations", err);
    }
  };

  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setCurrentPackage({ 
        ...pkg, 
        destinationId: pkg.destination?.id || ''
      });
      setIsEditing(true);
    } else {
      setCurrentPackage({ title: '', description: '', price: '', durationDays: '', imageUrl: '', available: true, destinationId: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (isEditing) {
        await api.put(`/packages/${currentPackage.id}`, currentPackage);
      } else {
        await api.post('/packages', currentPackage);
      }
      toast.success(isEditing ? 'Package updated successfully' : 'Package added successfully');
      fetchPackages();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving package", err);
      toast.error(err.response?.data?.message || "Error saving package");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await api.delete(`/packages/${id}`);
      toast.success("Package deleted successfully");
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package", err);
      toast.error(err.response?.data?.message || "Failed to delete package.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Package Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add Package</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        {loading ? (
          <div><SkeletonLoader type="table" /></div>
        ) : packages.length === 0 ? (
          <EmptyState title="No packages found" type="packages" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Duration(Days)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td>{pkg.id}</td>
                  <td>{pkg.title}</td>
                  <td>{pkg.destination?.name || 'N/A'}</td>
                  <td>₹{pkg.price}</td>
                  <td>{pkg.durationDays}</td>
                  <td>
                    <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={() => handleOpenModal(pkg)}>Edit</button>
                    <button className="btn btn-logout" onClick={() => handleDelete(pkg.id)}>Delete</button>
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
            <h2>{isEditing ? 'Edit Package' : 'Add Package'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Title</label>
                <input required type="text" value={currentPackage.title} onChange={e => setCurrentPackage({...currentPackage, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea required rows="3" value={currentPackage.description} onChange={e => setCurrentPackage({...currentPackage, description: e.target.value})} />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label>Price (₹)</label>
                  <input required type="number" step="0.01" min="1" value={currentPackage.price} onChange={e => setCurrentPackage({...currentPackage, price: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Duration (Days)</label>
                  <input required type="number" min="1" value={currentPackage.durationDays} onChange={e => setCurrentPackage({...currentPackage, durationDays: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Destination</label>
                <select required value={currentPackage.destinationId} onChange={e => setCurrentPackage({...currentPackage, destinationId: e.target.value})}>
                  <option value="">Select Destination</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={currentPackage.imageUrl || ''} onChange={e => setCurrentPackage({...currentPackage, imageUrl: e.target.value})} />
              </div>
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <input type="checkbox" id="availableCheck" checked={currentPackage.available} onChange={e => setCurrentPackage({...currentPackage, available: e.target.checked})} style={{ width: 'auto' }} />
                <label htmlFor="availableCheck" style={{ marginLeft: '10px' }}>Available</label>
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

export default AdminPackages;
