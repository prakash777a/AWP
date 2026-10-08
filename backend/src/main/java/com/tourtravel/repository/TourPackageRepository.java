package com.tourtravel.repository;

import com.tourtravel.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {

    @Query("SELECT p FROM TourPackage p WHERE " +
           "(:destinationId IS NULL OR p.destination.id = :destinationId) AND " +
           "(:available IS NULL OR p.available = :available) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.destination.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<TourPackage> findFilteredPackages(
            @Param("destinationId") Long destinationId,
            @Param("available") Boolean available,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("search") String search);
}
