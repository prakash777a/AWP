package com.tourtravel.service.impl;

import com.tourtravel.dto.payment.PaymentDto;
import com.tourtravel.entity.Booking;
import com.tourtravel.entity.Payment;
import com.tourtravel.entity.enums.BookingStatus;
import com.tourtravel.entity.enums.PaymentStatus;
import com.tourtravel.exception.BadRequestException;
import com.tourtravel.exception.ForbiddenException;
import com.tourtravel.exception.ResourceNotFoundException;
import com.tourtravel.repository.BookingRepository;
import com.tourtravel.repository.PaymentRepository;
import com.tourtravel.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Override
    public PaymentDto.Response createPayment(PaymentDto.Request request, String currentUserEmail) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + request.getBookingId()));

        // Ownership check — only the booking owner can pay
        if (!booking.getUser().getEmail().equals(currentUserEmail)) {
            throw new ForbiddenException("You are not authorized to make payment for this booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Cannot make payment for a cancelled booking");
        }
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("This booking is already completed");
        }
        if (booking.getPayment() != null) {
            throw new BadRequestException("Payment already exists for this booking");
        }

        // Backend uses booking.totalAmount — never trusts frontend price
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(booking.getTotalAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        // Generate a unique simulated transaction reference
        payment.setTransactionReference("TXN-" + UUID.randomUUID().toString().toUpperCase().substring(0, 12));
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());

        Payment saved = paymentRepository.save(payment);

        // After successful payment, confirm the booking
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        return mapToResponse(saved);
    }

    @Override
    public PaymentDto.Response getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
        return mapToResponse(payment);
    }

    @Override
    public PaymentDto.Response getPaymentByBookingId(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
        if (booking.getPayment() == null) {
            throw new ResourceNotFoundException("No payment found for booking id: " + bookingId);
        }
        return mapToResponse(booking.getPayment());
    }

    private PaymentDto.Response mapToResponse(Payment payment) {
        PaymentDto.Response response = new PaymentDto.Response();
        response.setId(payment.getId());
        response.setBookingId(payment.getBooking().getId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setTransactionReference(payment.getTransactionReference());
        response.setPaymentDate(payment.getPaymentDate());
        return response;
    }
}
