package com.tourtravel.service;

import com.tourtravel.dto.payment.PaymentDto;

public interface PaymentService {
    PaymentDto.Response createPayment(PaymentDto.Request request, String currentUserEmail);
    PaymentDto.Response getPaymentById(Long id);
    PaymentDto.Response getPaymentByBookingId(Long bookingId);
}
