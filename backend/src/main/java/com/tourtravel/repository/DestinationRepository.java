package com.tourtravel.repository;

import com.tourtravel.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {

    @Query("SELECT d FROM Destination d WHERE " +
           ":search IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.location) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Destination> findFilteredDestinations(@Param("search") String search);
}
