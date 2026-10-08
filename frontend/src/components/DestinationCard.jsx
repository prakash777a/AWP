import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  return (
    <div className="card">
      <div className="card-img-wrapper">
        {destination?.image ? (
          <img src={destination.image} alt={destination.name} className="card-img" />
        ) : (
          <div className="card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e9ecef', color: '#999' }}>
            <MapPin size={48} opacity={0.5} />
          </div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{destination?.name || 'Unknown Destination'}</h3>
        <p className="card-text">{destination?.description || 'No description available.'}</p>
        <Link to={`/destinations/${destination?.id}`} className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>
          Explore <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
