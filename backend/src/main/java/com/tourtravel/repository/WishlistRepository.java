package com.tourtravel.repository;

import com.tourtravel.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByUserIdAndTourPackageId(Long userId, Long tourPackageId);
    boolean existsByUserIdAndTourPackageId(Long userId, Long tourPackageId);
}
