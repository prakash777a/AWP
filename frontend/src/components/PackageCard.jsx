import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const PackageCard = ({ tourPackage }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = tourPackage ? isInWishlist(tourPackage.id) : false;

  return (
    <div className="card hover-lift" style={{ position: 'relative' }}>
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(tourPackage.id); }}
        style={{ 
          position: 'absolute', top: '15px', right: '15px', zIndex: 10, 
          background: 'var(--surface)', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: 'var(--shadow-md)', color: wishlisted ? 'var(--danger)' : 'var(--text-secondary)',
          transition: 'transform 0.2s ease', transform: wishlisted ? 'scale(1.1)' : 'scale(1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = wishlisted ? 'scale(1.1)' : 'scale(1)'}
      >
        <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>
      <div className="card-img-wrapper">
        {tourPackage?.imageUrl ? (
          <img src={tourPackage.imageUrl} alt={tourPackage.title} className="card-img" />
        ) : (
          <div className="card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e9ecef', color: '#999' }}>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{tourPackage?.title || 'Unknown Package'}</h3>
        <div className="card-subtitle">
          <MapPin size={14} /> {tourPackage?.destination?.name || 'Unknown Destination'}
        </div>
        <p className="card-text">{tourPackage?.description || 'No description available'}</p>
        <div className="card-footer">
          <div className="card-price">
            ₹{tourPackage?.price?.toLocaleString() || '0'} <span>/person</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
            <Clock size={14} /> {tourPackage?.durationDays || '0'} Days
          </div>
        </div>
        <Link to={`/packages/${tourPackage?.id}`} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
