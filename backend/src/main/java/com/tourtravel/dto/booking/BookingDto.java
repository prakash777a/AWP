package com.tourtravel.dto.booking;

import com.tourtravel.entity.enums.BookingStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingDto {

    /**
     * Used by customer to create a booking.
     * userId is NOT included - resolved from JWT security context.
     */
    @Data
    public static class Request {
        @NotNull
        private Long packageId;

        @NotNull
        @Future(message = "Travel date must be in the future")
        private LocalDate travelDate;

        @NotNull
        @Min(value = 1, message = "Number of travelers must be at least 1")
        @Max(value = 20, message = "Number of travelers cannot exceed 20")
        private Integer numberOfTravelers;
    }

    /**
     * Used by admin to update booking status.
     */
    @Data
    public static class StatusUpdateRequest {
        @NotNull
        private BookingStatus status;
    }

    /**
     * Rich response DTO with nested summaries.
     */
    @Data
    public static class Response {
        private Long id;
        private UserSummary customer;
        private PackageSummary tourPackage;
        private LocalDate travelDate;
        private Integer numberOfTravelers;
        private BigDecimal totalAmount;
        private BookingStatus status;
        private LocalDateTime bookingDate;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private PaymentInfo payment;
    }

    @Data
    public static class UserSummary {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
    }

    @Data
    public static class PackageSummary {
        private Long id;
        private String title;
        private String destinationName;
        private BigDecimal price;
        private Integer durationDays;
        private String imageUrl;
    }

    @Data
    public static class PaymentInfo {
        private Long id;
        private String paymentMethod;
        private String paymentStatus;
        private String transactionReference;
        private LocalDateTime paymentDate;
    }
}
