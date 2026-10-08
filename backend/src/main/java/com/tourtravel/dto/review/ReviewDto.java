package com.tourtravel.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

public class ReviewDto {
    @Data
    public static class Request {
        @NotNull private Long userId;
        @NotNull private Long tourPackageId;
        @NotNull @Min(1) @Max(5) private Integer rating;
        private String comment;
    }
    @Data
    public static class Response {
        private Long id;
        private Long userId;
        private Long tourPackageId;
        private Integer rating;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
