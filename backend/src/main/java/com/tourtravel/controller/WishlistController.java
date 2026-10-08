package com.tourtravel.controller;

import com.tourtravel.entity.Wishlist;
import com.tourtravel.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlists")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<Wishlist>> getMyWishlist(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(wishlistService.getUserWishlist(email));
    }

    @PostMapping("/{packageId}")
    public ResponseEntity<Wishlist> addToWishlist(
            @PathVariable Long packageId,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(wishlistService.addToWishlist(email, packageId));
    }

    @DeleteMapping("/{packageId}")
    public ResponseEntity<Void> removeFromWishlist(
            @PathVariable Long packageId,
            Authentication authentication) {
        String email = authentication.getName();
        wishlistService.removeFromWishlist(email, packageId);
        return ResponseEntity.ok().build();
    }
}
