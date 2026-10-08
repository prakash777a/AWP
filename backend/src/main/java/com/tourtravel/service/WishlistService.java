package com.tourtravel.service;

import com.tourtravel.entity.Wishlist;
import java.util.List;

public interface WishlistService {
    List<Wishlist> getUserWishlist(String email);
    Wishlist addToWishlist(String email, Long packageId);
    void removeFromWishlist(String email, Long packageId);
}
