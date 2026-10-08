import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ShieldCheck, MapPin, ArrowRight, Search, Clock, CreditCard, HeadphonesIcon, Star, User } from 'lucide-react';
import api from '../services/api';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import SkeletonLoader from '../components/SkeletonLoader';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pkgResp, destResp, reviewResp] = await Promise.all([
          api.get('/packages'),
          api.get('/destinations'),
          api.get('/reviews').catch(() => ({ data: [] }))
        ]);
        
        setPackages(Array.isArray(pkgResp.data) ? pkgResp.data.slice(0, 3) : []);
        setDestinations(Array.isArray(destResp.data) ? destResp.data.slice(0, 3) : []);
        setReviews(Array.isArray(reviewResp.data) ? reviewResp.data.slice(0, 3) : []);
      } catch (error) {
        console.error("Error fetching homepage data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-page">
      <section style={{
        height: '90vh',
        minHeight: '650px',
        background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.5)), url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80") center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-lg)',
        color: 'white',
      }}>
        <div className="container" style={{ zIndex: 1, marginTop: '2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
            <h1 style={{ fontSize: 'var(--font-hero)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, color: 'white', letterSpacing: '-1px' }}>
              Discover Your Next <span style={{ color: 'var(--secondary-light)' }}>Adventure</span>
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, fontWeight: 300, lineHeight: 1.6 }}>
              Explore breathtaking destinations, premium packages, and unforgettable experiences curated just for you.
            </p>
            
            <form onSubmit={handleSearch} className="search-box-hero" style={{
              display: 'flex',
              background: 'var(--surface)',
              padding: '0.5rem',
              borderRadius: 'var(--border-radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-primary)' }}>
                <Search size={20} style={{ color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', padding: '0.75rem', fontSize: '1rem', background: 'transparent', color: 'var(--text-primary)' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--border-radius-lg)', padding: '0.75rem 1.5rem' }}>
                Search
              </button>
            </form>

            <div className="d-flex gap-2 justify-content-center stack-on-mobile">
              <Link to="/packages" className="btn btn-primary btn-large">
                Explore Packages
              </Link>
              <Link to="/destinations" className="btn btn-outline btn-large" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Popular Destinations</h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '0' }}>Explore our most visited places</p>
            </div>
            <Link to="/destinations" className="btn btn-ghost" style={{ color: 'var(--secondary)' }}>
              See all <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-3">
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
             </div>
          ) : (
             <div className="grid grid-cols-3">
               {destinations.length === 0 ? (
                 <p>No destinations available.</p>
               ) : (
                 destinations.map(d => <DestinationCard key={d.id} destination={d} />)
               )}
             </div>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Featured Packages</h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '0' }}>Handpicked tours for your next holiday</p>
            </div>
            <Link to="/packages" className="btn btn-ghost" style={{ color: 'var(--secondary)' }}>
              See all <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
             <div className="grid grid-cols-3">
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
               <SkeletonLoader type="card" />
             </div>
          ) : (
             <div className="grid grid-cols-3">
               {packages.length === 0 ? (
                 <p>No packages available.</p>
               ) : (
                 packages.map(p => <PackageCard key={p.id} tourPackage={p} />)
               )}
             </div>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">We provide the best travel experience in the industry</p>
          
          <div className="grid grid-cols-4 text-center" style={{ marginTop: '3rem' }}>
            <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Compass size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Trusted Packages</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Experience the finest travel arrangements tailored to your needs by our experts.</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Clock size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Easy Booking</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Our seamless platform ensures you can book your dream vacation in minutes.</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '64px', height: '64px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CreditCard size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Secure Payment</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your bookings and transactions are safe with our enterprise-grade secure platform.</p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="hover-lift">
              <div style={{ width: '64px', height: '64px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <HeadphonesIcon size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>24/7 Support</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We are here to assist you at any time, anywhere in the world on your journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--surface)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
           <h2 className="section-title">How It Works</h2>
           <p className="section-subtitle">Your journey begins here</p>
           
           <div className="how-it-works-timeline" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'var(--border)', zIndex: 0 }} className="desktop-only"></div>
              
              {[
                { step: '1', title: 'Explore', desc: 'Find packages' },
                { step: '2', title: 'Choose', desc: 'Pick your favorite' },
                { step: '3', title: 'Book', desc: 'Reserve dates' },
                { step: '4', title: 'Pay', desc: 'Secure payment' },
                { step: '5', title: 'Travel', desc: 'Enjoy your trip' }
              ].map((item, index) => (
                 <div key={index} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--surface)', padding: '0 1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem', boxShadow: 'var(--shadow-md)' }}>
                       {item.step}
                    </div>
                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      <section className="section text-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">Traveler Reviews</h2>
          <p className="section-subtitle">What our happy clients say about our tours</p>
          
          <div className="grid grid-cols-3 text-left" style={{ marginTop: '2rem' }}>
             {reviews.length > 0 ? reviews.map((review) => (
               <div key={review.id} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="d-flex" style={{ gap: '0.2rem', color: 'var(--warning)', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "var(--border)"} />)}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>"{review.comment}"</p>
                  <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
                     <div style={{ width: '40px', height: '40px', background: 'var(--background)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                       <User size={20} />
                     </div>
                     <div>
                       <h5 style={{ margin: 0, fontSize: '0.95rem' }}>Traveler</h5>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Verified Booking</p>
                     </div>
                  </div>
               </div>
             )) : (
               <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                 <p>Our travelers have amazing stories. Be the first to share yours!</p>
               </div>
             )}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--primary)', color: 'white', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Ready for your next adventure?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Join thousands of happy travelers and book your dream vacation today.</p>
          <Link to="/packages" className="btn btn-secondary btn-large">
            Explore Packages
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
