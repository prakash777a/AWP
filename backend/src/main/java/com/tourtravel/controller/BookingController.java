package com.tourtravel.controller;

import com.tourtravel.dto.booking.BookingDto;
import com.tourtravel.entity.enums.BookingStatus;
import com.tourtravel.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // ─── CUSTOMER ENDPOINTS ───────────────────────────────────────────────────

    /**
     * Create a booking. User resolved from JWT — never from request body.
     */
    @PostMapping("/api/bookings")
    public ResponseEntity<BookingDto.Response> createBooking(
            @Valid @RequestBody BookingDto.Request request,
            Authentication authentication) {
        String email = authentication.getName();
        return new ResponseEntity<>(bookingService.createBooking(request, email), HttpStatus.CREATED);
    }

    /**
     * Get all bookings belonging to the authenticated customer.
     */
    @GetMapping("/api/bookings/my")
    public ResponseEntity<List<BookingDto.Response>> getMyBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getMyBookings(authentication.getName()));
    }

    /**
     * Get a specific booking — ownership enforced by service.
     */
    @GetMapping("/api/bookings/my/{id}")
    public ResponseEntity<BookingDto.Response> getMyBookingById(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(bookingService.getMyBookingById(id, authentication.getName()));
    }

    /**
     * Cancel a booking owned by the authenticated customer.
     */
    @PutMapping("/api/bookings/{id}/cancel")
    public ResponseEntity<BookingDto.Response> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(bookingService.cancelMyBooking(id, authentication.getName()));
    }

    // ─── ADMIN ENDPOINTS ──────────────────────────────────────────────────────

    @GetMapping("/api/admin/bookings")
    public ResponseEntity<List<BookingDto.Response>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/api/admin/bookings/{id}")
    public ResponseEntity<BookingDto.Response> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PutMapping("/api/admin/bookings/{id}/status")
    public ResponseEntity<BookingDto.Response> updateBookingStatus(
            @PathVariable Long id,
            @Valid @RequestBody BookingDto.StatusUpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, request.getStatus()));
    }

    @DeleteMapping("/api/admin/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
