import React, { useEffect, useState, useMemo } from 'react';
import { Search, MapPin, Filter, XCircle, PackageSearch } from 'lucide-react';
import api from '../services/api';
import PackageCard from '../components/PackageCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { useLocation } from 'react-router-dom';
import './Packages.css';

const Packages = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  
  // Filters
  const [search, setSearch] = useState(initialSearch);
  const [destinationId, setDestinationId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [duration, setDuration] = useState(''); // client-side
  const [minRating, setMinRating] = useState(''); // client-side
  const [available, setAvailable] = useState(''); // boolean string
  
  // Sorting
  const [sortBy, setSortBy] = useState('newest'); // default newest

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPackages();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, destinationId, minPrice, maxPrice, available]);

  const fetchDestinations = async () => {
    try {
      const resp = await api.get('/destinations');
      setDestinations(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let url = '/packages';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (destinationId) params.append('destinationId', destinationId);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (available === 'true') params.append('available', 'true');
      if (available === 'false') params.append('available', 'false');
      
      const queryString = params.toString();
      if (queryString) url += '?' + queryString;
      
      const resp = await api.get(url);
      setPackages(Array.isArray(resp.data) ? resp.data : []);
    } catch (error) {
      console.error("Error fetching packages", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setDestinationId('');
    setMinPrice('');
    setMaxPrice('');
    setDuration('');
    setMinRating('');
    setAvailable('');
    setSortBy('newest');
  };

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packages];
    
    // Client-side filtering
    if (duration) {
      if (duration === 'short') result = result.filter(p => p.durationDays <= 3);
      else if (duration === 'medium') result = result.filter(p => p.durationDays > 3 && p.durationDays <= 7);
      else if (duration === 'long') result = result.filter(p => p.durationDays > 7);
    }
    
    if (minRating) {
      // Assuming rating is 0 if no reviews? Will just fall back gracefully
    }

    // Client-side sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        // Not implemented on backend yet, default to ID for now or 0
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }
    return result;
  }, [packages, duration, minRating, sortBy]);

  return (
    <div className="section" style={{ padding: '0', backgroundColor: 'var(--background)' }}>
      <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0 6rem' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Tour Packages</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Find the perfect package for your next dream vacation.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', marginBottom: '3rem' }}>
          
          <div className="grid grid-cols-4" style={{ gap: '1rem', marginBottom: '1rem' }} >
            <div style={{ position: 'relative', gridColumn: 'span 2' }} className="stack-on-mobile">
              <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search by package name or description..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.75rem', width: '100%', margin: 0 }}
              />
            </div>
            
            <div style={{ position: 'relative' }} className="stack-on-mobile">
              <MapPin size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
              <select 
                value={destinationId} 
                onChange={(e) => setDestinationId(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.75rem', width: '100%', margin: 0, appearance: 'none' }}
              >
                <option value="">All Destinations</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            
            <div style={{ position: 'relative' }} className="stack-on-mobile">
               <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control"
                style={{ width: '100%', margin: 0 }}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-4" style={{ gap: '1rem' }}>
             <div style={{ position: 'relative' }} className="stack-on-mobile">
               <input 
                 type="number" 
                 placeholder="Min Price (₹)" 
                 value={minPrice}
                 onChange={(e) => setMinPrice(e.target.value)}
                 className="form-control"
                 style={{ width: '100%', margin: 0 }}
               />
             </div>
             <div style={{ position: 'relative' }} className="stack-on-mobile">
               <input 
                 type="number" 
                 placeholder="Max Price (₹)" 
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(e.target.value)}
                 className="form-control"
                 style={{ width: '100%', margin: 0 }}
               />
             </div>
             <div style={{ position: 'relative' }} className="stack-on-mobile">
               <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="form-control"
                style={{ width: '100%', margin: 0 }}
              >
                <option value="">Any Duration</option>
                <option value="short">1-3 Days</option>
                <option value="medium">4-7 Days</option>
                <option value="long">8+ Days</option>
              </select>
             </div>
             <div style={{ position: 'relative', display: 'flex', gap: '0.5rem' }} className="stack-on-mobile">
               <select 
                value={available} 
                onChange={(e) => setAvailable(e.target.value)}
                className="form-control"
                style={{ width: '100%', margin: 0 }}
              >
                <option value="">All Availability</option>
                <option value="true">Available</option>
                <option value="false">Sold Out</option>
              </select>
              
              <button onClick={clearFilters} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }} title="Clear Filters">
                 <XCircle size={18} />
              </button>
             </div>
          </div>
        </div>
        
        <div style={{ paddingBottom: '4rem' }}>
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
             {loading ? 'Searching...' : <strong>{filteredAndSortedPackages.length} packages found</strong>}
          </div>

          {loading ? (
             <div className="grid grid-cols-3">
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
             </div>
          ) : filteredAndSortedPackages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <EmptyState 
                type="packages" 
                actionText="Clear Filters" 
                actionOnClick={clearFilters} 
              />
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {filteredAndSortedPackages.map(pkg => (
                <PackageCard key={pkg.id} tourPackage={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
