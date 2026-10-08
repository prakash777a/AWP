import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';
import Loading from '../components/Loading';
import PackageCard from '../components/PackageCard';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const destResp = await api.get(`/destinations/${id}`);
        setDestination(destResp.data);
        
        const pkgResp = await api.get(`/packages?destinationId=${id}`);
        setPackages(Array.isArray(pkgResp.data) ? pkgResp.data : []);
      } catch (err) {
        console.error("Error fetching destination details", err);
        setError("Destination not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="container section">
      <div className="form-error">{error}</div>
      <Link to="/destinations" className="btn btn-outline" style={{ marginTop: '1rem' }}>Back to Destinations</Link>
    </div>
  );
  
  if (!destination) return null;

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div style={{ position: 'relative', height: '50vh', minHeight: '400px', backgroundColor: '#e9ecef' }}>
        {destination.imageUrl ? (
          <>
            <img src={destination.imageUrl} alt={destination.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
            <ImageIcon size={64} opacity={0.5} />
          </div>
        )}
        
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0 }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{destination.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', gap: '0.5rem' }}>
            <MapPin size={24} /> {destination.location || destination.name}
          </div>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '3rem' }}>
        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>About {destination.name}</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {destination.description}
          </p>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', display: 'inline-block' }}>
            Tour Packages for {destination.name}
          </h3>
          
          {packages.length === 0 ? (
            <div style={{ background: 'var(--surface)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No tour packages available for this destination yet. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {packages.map(pkg => <PackageCard key={pkg.id} tourPackage={pkg} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
