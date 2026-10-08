import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, UserPlus, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Auth.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!fullName || !email || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    try {
      await register({ fullName, email, phone, password });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--background)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-lg)' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Join TourVista and start your journey</p>
          </div>
          
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  className="form-control"
                  style={{ paddingLeft: '2.75rem' }}
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="John Doe" 
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  className="form-control"
                  style={{ paddingLeft: '2.75rem' }}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="john@example.com" 
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                <input 
                  type="tel" 
                  className="form-control"
                  style={{ paddingLeft: '2.75rem' }}
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+91 9999999999" 
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="form-group mb-4">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
                <input 
                  type="password" 
                  className="form-control"
                  style={{ paddingLeft: '2.75rem' }}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Min 6 characters" 
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />} 
              {isLoading ? 'Registering...' : 'Create Account'}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Login here</Link>
          </div>
        </div>
      </div>
      
      <div className="hide-on-mobile" style={{ flex: 1, backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-c53cd3b858ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', color: 'white', maxWidth: '400px', textAlign: 'right' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Unlock the World</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Get exclusive deals and personalized itineraries by creating a free account.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
