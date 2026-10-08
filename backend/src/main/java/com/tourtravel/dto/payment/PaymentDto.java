package com.tourtravel.dto.payment;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.tourtravel.entity.enums.PaymentMethod;
import com.tourtravel.entity.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDto {
    @Data
    public static class Request {
        @NotNull private Long bookingId;
        @NotNull private PaymentMethod paymentMethod;
        private String transactionReference;
    }
    @Data
    public static class Response {
        private Long id;
        private Long bookingId;
        private BigDecimal amount;
        private PaymentMethod paymentMethod;
        private PaymentStatus paymentStatus;
        private String transactionReference;
        private LocalDateTime paymentDate;
    }
}
