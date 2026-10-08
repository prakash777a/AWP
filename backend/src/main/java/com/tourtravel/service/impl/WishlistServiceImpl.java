package com.tourtravel.service.impl;

import com.tourtravel.entity.TourPackage;
import com.tourtravel.entity.User;
import com.tourtravel.entity.Wishlist;
import com.tourtravel.repository.TourPackageRepository;
import com.tourtravel.repository.UserRepository;
import com.tourtravel.repository.WishlistRepository;
import com.tourtravel.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final TourPackageRepository tourPackageRepository;

    @Override
    public List<Wishlist> getUserWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return wishlistRepository.findByUserId(user.getId());
    }

    @Override
    public Wishlist addToWishlist(String email, Long packageId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        TourPackage tourPackage = tourPackageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        if (wishlistRepository.existsByUserIdAndTourPackageId(user.getId(), packageId)) {
            throw new RuntimeException("Package already in wishlist");
        }

        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .tourPackage(tourPackage)
                .build();
        
        return wishlistRepository.save(wishlist);
    }

    @Override
    public void removeFromWishlist(String email, Long packageId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Wishlist wishlist = wishlistRepository.findByUserIdAndTourPackageId(user.getId(), packageId)
                .orElseThrow(() -> new RuntimeException("Item not found in wishlist"));
        
        wishlistRepository.delete(wishlist);
    }
}
