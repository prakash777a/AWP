package com.tourtravel.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.tourtravel.entity.enums.UserRole;
import java.time.LocalDateTime;

public class UserDto {
    @Data
    public static class Request {
        @NotBlank private String fullName;
        @NotBlank @Email private String email;
        private String phone;
        @NotBlank private String password;
        @NotNull private UserRole role;
    }
    @Data
    public static class Response {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private UserRole role;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
