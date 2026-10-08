package com.tourtravel.service;

import com.tourtravel.dto.tourpackage.TourPackageDto;
import java.math.BigDecimal;
import java.util.List;

public interface TourPackageService {
    TourPackageDto.Response createPackage(TourPackageDto.Request request);
    List<TourPackageDto.Response> getAllPackages(Long destinationId, Boolean available, BigDecimal minPrice, BigDecimal maxPrice, String search);
    TourPackageDto.Response getPackageById(Long id);
    TourPackageDto.Response updatePackage(Long id, TourPackageDto.Request request);
    void deletePackage(Long id);
    List<TourPackageDto.Response> getPackagesByDestinationId(Long destinationId);
}
