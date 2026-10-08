package com.tourtravel.dto.destination;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

public class DestinationDto {
    @Data
    public static class Request {
        @NotBlank private String name;
        private String description;
        private String imageUrl;
        private String location;
    }
    @Data
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        private String location;
        private Integer packageCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
