import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (user && user.role === 'CUSTOMER') {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const resp = await api.get('/wishlists');
      setWishlist(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error('Error loading wishlist', err);
    }
  };

  const toggleWishlist = async (packageId) => {
    if (!user) {
      toast.info('Please login to save packages to your wishlist.');
      return;
    }

    const exists = wishlist.find(w => w.tourPackage?.id === packageId);
    try {
      if (exists) {
        await api.delete(`/wishlists/${packageId}`);
        setWishlist(prev => prev.filter(w => w.tourPackage?.id !== packageId));
        toast.info('Removed from wishlist');
      } else {
        const resp = await api.post(`/wishlists/${packageId}`);
        setWishlist(prev => [...prev, resp.data]);
        toast.success('Added to wishlist');
      }
    } catch (err) {
      toast.error('Failed to update wishlist');
    }
  };

  const isInWishlist = (packageId) => {
    return wishlist.some(w => w.tourPackage?.id === packageId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
