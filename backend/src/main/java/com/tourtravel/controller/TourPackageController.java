package com.tourtravel.controller;

import com.tourtravel.dto.tourpackage.TourPackageDto;
import com.tourtravel.service.TourPackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TourPackageController {

    private final TourPackageService tourPackageService;

    @PostMapping("/api/packages")
    public ResponseEntity<TourPackageDto.Response> createPackage(@Valid @RequestBody TourPackageDto.Request request) {
        return new ResponseEntity<>(tourPackageService.createPackage(request), HttpStatus.CREATED);
    }

    @GetMapping("/api/packages")
    public ResponseEntity<List<TourPackageDto.Response>> getAllPackages(
            @RequestParam(required = false) Long destinationId,
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(tourPackageService.getAllPackages(destinationId, available, minPrice, maxPrice, search));
    }

    @GetMapping("/api/packages/{id}")
    public ResponseEntity<TourPackageDto.Response> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(tourPackageService.getPackageById(id));
    }

    @PutMapping("/api/packages/{id}")
    public ResponseEntity<TourPackageDto.Response> updatePackage(@PathVariable Long id, @Valid @RequestBody TourPackageDto.Request request) {
        return ResponseEntity.ok(tourPackageService.updatePackage(id, request));
    }

    @DeleteMapping("/api/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        tourPackageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

}
