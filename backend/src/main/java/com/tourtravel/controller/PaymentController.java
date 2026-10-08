package com.tourtravel.controller;

import com.tourtravel.dto.payment.PaymentDto;
import com.tourtravel.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Process a simulated payment for a booking.
     * Amount is taken from booking in DB — never from frontend.
     */
    @PostMapping("/api/payments")
    public ResponseEntity<PaymentDto.Response> createPayment(
            @Valid @RequestBody PaymentDto.Request request,
            Authentication authentication) {
        return new ResponseEntity<>(paymentService.createPayment(request, authentication.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/api/payments/{id}")
    public ResponseEntity<PaymentDto.Response> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @GetMapping("/api/bookings/{bookingId}/payment")
    public ResponseEntity<PaymentDto.Response> getPaymentByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(paymentService.getPaymentByBookingId(bookingId));
    }
}
