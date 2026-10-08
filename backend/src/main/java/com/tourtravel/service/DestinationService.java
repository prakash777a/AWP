package com.tourtravel.service;

import com.tourtravel.dto.destination.DestinationDto;
import java.util.List;

public interface DestinationService {
    DestinationDto.Response createDestination(DestinationDto.Request request);
    List<DestinationDto.Response> getAllDestinations(String search);
    DestinationDto.Response getDestinationById(Long id);
    DestinationDto.Response updateDestination(Long id, DestinationDto.Request request);
    void deleteDestination(Long id);
}
