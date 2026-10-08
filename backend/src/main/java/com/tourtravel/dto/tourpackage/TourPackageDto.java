package com.tourtravel.dto.tourpackage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TourPackageDto {
    @Data
    public static class Request {
        @NotBlank private String title;
        private String description;
        @NotNull @Positive private BigDecimal price;
        @NotNull @Positive private Integer durationDays;
        private String imageUrl;
        @NotNull private Boolean available;
        @NotNull private Long destinationId;
    }
    @Data
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private Integer durationDays;
        private String imageUrl;
        private Boolean available;
        private DestinationSummary destination;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    public static class DestinationSummary {
        private Long id;
        private String name;
    }
}
