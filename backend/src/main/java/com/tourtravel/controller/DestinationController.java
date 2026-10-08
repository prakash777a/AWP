package com.tourtravel.controller;

import com.tourtravel.dto.destination.DestinationDto;
import com.tourtravel.service.DestinationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationService destinationService;

    @PostMapping
    public ResponseEntity<DestinationDto.Response> createDestination(@Valid @RequestBody DestinationDto.Request request) {
        return new ResponseEntity<>(destinationService.createDestination(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DestinationDto.Response>> getAllDestinations(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(destinationService.getAllDestinations(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationDto.Response> getDestinationById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getDestinationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationDto.Response> updateDestination(@PathVariable Long id, @Valid @RequestBody DestinationDto.Request request) {
        return ResponseEntity.ok(destinationService.updateDestination(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/packages")
    public ResponseEntity<?> getDestinationPackages(@PathVariable Long id) {
        // Handled in PackageController typically, or can delegate to packageService here
        return ResponseEntity.ok().build(); 
    }
}
