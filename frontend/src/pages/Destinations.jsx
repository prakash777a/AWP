import React, { useEffect, useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import api from '../services/api';
import DestinationCard from '../components/DestinationCard';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDestinations();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let url = '/destinations';
      if (search) url += `?search=${encodeURIComponent(search)}`;
      
      const resp = await api.get(url);
      setDestinations(Array.isArray(resp.data) ? resp.data : []);
    } catch (error) {
      console.error("Error fetching destinations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ padding: '0', backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0 6rem', backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.9), rgba(10, 25, 47, 0.8)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Explore Destinations</h1>
          <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Find the beautiful places across the globe.</p>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search destinations by name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '2.75rem', margin: 0, paddingRight: '1rem' }}
            />
          </div>
        </div>

        <div style={{ paddingBottom: '4rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              <Loader2 size={48} className="animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--secondary)' }} />
              <p>Discovering destinations...</p>
            </div>
          ) : destinations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <MapPin size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--text-secondary)', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No destinations found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {destinations.map(d => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
