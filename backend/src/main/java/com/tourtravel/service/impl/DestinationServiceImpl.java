package com.tourtravel.service.impl;

import com.tourtravel.dto.destination.DestinationDto;
import com.tourtravel.entity.Destination;
import com.tourtravel.exception.ResourceNotFoundException;
import com.tourtravel.repository.DestinationRepository;
import com.tourtravel.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;

    @Override
    public DestinationDto.Response createDestination(DestinationDto.Request request) {
        Destination destination = new Destination();
        destination.setName(request.getName());
        destination.setDescription(request.getDescription());
        destination.setImageUrl(request.getImageUrl());
        destination.setLocation(request.getLocation());

        Destination saved = destinationRepository.save(destination);
        return mapToResponse(saved);
    }

    @Override
    public List<DestinationDto.Response> getAllDestinations(String search) {
        return destinationRepository.findFilteredDestinations(search).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public DestinationDto.Response getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
        return mapToResponse(destination);
    }

    @Override
    public DestinationDto.Response updateDestination(Long id, DestinationDto.Request request) {
        Destination destination = destinationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
        destination.setName(request.getName());
        destination.setDescription(request.getDescription());
        destination.setImageUrl(request.getImageUrl());
        destination.setLocation(request.getLocation());

        Destination updated = destinationRepository.save(destination);
        return mapToResponse(updated);
    }

    @Override
    public void deleteDestination(Long id) {
        Destination destination = destinationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
        if (!destination.getTourPackages().isEmpty()) {
            throw new com.tourtravel.exception.BadRequestException("Cannot delete this destination because tour packages are associated with it.");
        }
        destinationRepository.delete(destination);
    }

    private DestinationDto.Response mapToResponse(Destination destination) {
        DestinationDto.Response response = new DestinationDto.Response();
        response.setId(destination.getId());
        response.setName(destination.getName());
        response.setDescription(destination.getDescription());
        response.setImageUrl(destination.getImageUrl());
        response.setLocation(destination.getLocation());
        response.setPackageCount(destination.getTourPackages().size());
        response.setCreatedAt(destination.getCreatedAt());
        response.setUpdatedAt(destination.getUpdatedAt());
        return response;
    }
}
