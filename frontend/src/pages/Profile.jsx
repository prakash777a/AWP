import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Shield, LogOut, Briefcase, Map, Star, Plane, RotateCcw, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import PackageCard from '../components/PackageCard';
import { useWishlist } from '../context/WishlistContext';
import './Profile.css'; // Will be empty

const Profile = () => {
  const { user, logout } = useAuth();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist } = useWishlist();

  useEffect(() => {
    if (user && user.role === 'CUSTOMER') {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const resp = await api.get('/bookings/my');
      setBookings(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = bookings.length;
    const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;
    const completed = bookings.filter(b => b.status === 'COMPLETED').length;
    const upcoming = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING').length;
    return { total, upcoming, completed, cancelled };
  };

  const stats = calculateStats();

  if (!user) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem', backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)' }}>
      <SkeletonLoader type="card" />
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 80px)', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          
          {/* Header Cover */}
          <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)' }}></div>
          
          <div style={{ padding: '0 2.5rem 2.5rem', position: 'relative' }}>
            {/* Avatar */}
            <div style={{ 
              width: '100px', height: '100px', borderRadius: '50%', background: 'var(--surface)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)',
              marginTop: '-50px', marginBottom: '1.5rem', border: '4px solid var(--surface)',
              boxShadow: 'var(--shadow-md)'
            }}>
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 0.5rem' }}>
                {user.fullName}
              </h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', background: 'rgba(0, 119, 182, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600 }}>
                <Shield size={14} /> {user.role?.replace('ROLE_', '')}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.1rem' }}>Email Address</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{user.email}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.1rem' }}>Phone Number</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{user.phone || 'Not provided'}</div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={logout} 
              className="btn btn-ghost text-danger" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', color: 'var(--danger)' }}
            >
              <LogOut size={18} /> Log out of your account
            </button>
          </div>
        </div>

        {user.role === 'CUSTOMER' && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>My Dashboard</h2>
            
            {loading ? (
              <div className="grid grid-cols-4 gap-2 mb-4">
                 <SkeletonLoader type="card" />
                 <SkeletonLoader type="card" />
                 <SkeletonLoader type="card" />
                 <SkeletonLoader type="card" />
              </div>
            ) : (
              <div className="grid grid-cols-4 mb-4" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
                 <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--secondary)' }}>
                       <Map size={24} />
                     </div>
                     <span style={{ fontWeight: 600 }}>Total Trips</span>
                   </div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.total}</div>
                 </div>

                 <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: 'var(--warning)' }}>
                       <Clock size={24} />
                     </div>
                     <span style={{ fontWeight: 600 }}>Upcoming Trips</span>
                   </div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.upcoming}</div>
                 </div>

                 <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--success)' }}>
                       <Plane size={24} />
                     </div>
                     <span style={{ fontWeight: 600 }}>Completed</span>
                   </div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.completed}</div>
                 </div>
                 
                 <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '50%', color: 'var(--accent)' }}>
                       <RotateCcw size={24} />
                     </div>
                     <span style={{ fontWeight: 600 }}>Cancelled</span>
                   </div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.cancelled}</div>
                 </div>
              </div>
            )}
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Quick Actions</h3>
            <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
              <Link to="/packages" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }} className="hover-lift">
                 <Map size={32} color="var(--secondary)" />
                 <span style={{ fontWeight: 600 }}>Explore Packages</span>
              </Link>
              <Link to="/my-bookings" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }} className="hover-lift">
                 <Briefcase size={32} color="var(--warning)" />
                 <span style={{ fontWeight: 600 }}>My Bookings</span>
              </Link>
              <Link to="/packages" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }} className="hover-lift">
                 <Star size={32} color="var(--success)" />
                 <span style={{ fontWeight: 600 }}>My Reviews</span>
              </Link>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '3rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={24} color="var(--danger)" fill="var(--danger)" /> My Wishlist
            </h3>
            
            {wishlist.length === 0 ? (
              <EmptyState title="Wishlist empty" description="You haven't saved any packages yet." type="default" />
            ) : (
              <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
                {wishlist.map(w => (
                  <PackageCard key={w.id} tourPackage={w.tourPackage} />
                ))}
            </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
