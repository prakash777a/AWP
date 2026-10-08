package com.tourtravel.service.impl;

import com.tourtravel.dto.tourpackage.TourPackageDto;
import com.tourtravel.entity.Destination;
import com.tourtravel.entity.TourPackage;
import com.tourtravel.exception.ResourceNotFoundException;
import com.tourtravel.repository.DestinationRepository;
import com.tourtravel.repository.TourPackageRepository;
import com.tourtravel.service.TourPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourPackageServiceImpl implements TourPackageService {

    private final TourPackageRepository tourPackageRepository;
    private final DestinationRepository destinationRepository;

    @Override
    public TourPackageDto.Response createPackage(TourPackageDto.Request request) {
        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        TourPackage tourPackage = new TourPackage();
        tourPackage.setTitle(request.getTitle());
        tourPackage.setDescription(request.getDescription());
        tourPackage.setPrice(request.getPrice());
        tourPackage.setDurationDays(request.getDurationDays());
        tourPackage.setImageUrl(request.getImageUrl());
        tourPackage.setAvailable(request.getAvailable());
        tourPackage.setDestination(destination);

        TourPackage saved = tourPackageRepository.save(tourPackage);
        return mapToResponse(saved);
    }

    @Override
    public List<TourPackageDto.Response> getAllPackages(Long destinationId, Boolean available, BigDecimal minPrice, BigDecimal maxPrice, String search) {
        return tourPackageRepository.findFilteredPackages(destinationId, available, minPrice, maxPrice, search).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public TourPackageDto.Response getPackageById(Long id) {
        TourPackage tourPackage = tourPackageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
        return mapToResponse(tourPackage);
    }

    @Override
    public TourPackageDto.Response updatePackage(Long id, TourPackageDto.Request request) {
        TourPackage tourPackage = tourPackageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        tourPackage.setTitle(request.getTitle());
        tourPackage.setDescription(request.getDescription());
        tourPackage.setPrice(request.getPrice());
        tourPackage.setDurationDays(request.getDurationDays());
        tourPackage.setImageUrl(request.getImageUrl());
        tourPackage.setAvailable(request.getAvailable());
        tourPackage.setDestination(destination);

        TourPackage updated = tourPackageRepository.save(tourPackage);
        return mapToResponse(updated);
    }

    @Override
    public void deletePackage(Long id) {
        TourPackage tourPackage = tourPackageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
        if (!tourPackage.getBookings().isEmpty()) {
            throw new com.tourtravel.exception.BadRequestException("Cannot delete this package because bookings are associated with it.");
        }
        tourPackageRepository.delete(tourPackage);
    }

    @Override
    public List<TourPackageDto.Response> getPackagesByDestinationId(Long destinationId) {
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
        return destination.getTourPackages().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private TourPackageDto.Response mapToResponse(TourPackage tourPackage) {
        TourPackageDto.Response response = new TourPackageDto.Response();
        response.setId(tourPackage.getId());
        response.setTitle(tourPackage.getTitle());
        response.setDescription(tourPackage.getDescription());
        response.setPrice(tourPackage.getPrice());
        response.setDurationDays(tourPackage.getDurationDays());
        response.setImageUrl(tourPackage.getImageUrl());
        response.setAvailable(tourPackage.getAvailable());
        TourPackageDto.DestinationSummary destSummary = new TourPackageDto.DestinationSummary();
        destSummary.setId(tourPackage.getDestination().getId());
        destSummary.setName(tourPackage.getDestination().getName());
        response.setDestination(destSummary);
        response.setCreatedAt(tourPackage.getCreatedAt());
        response.setUpdatedAt(tourPackage.getUpdatedAt());
        return response;
    }
}
