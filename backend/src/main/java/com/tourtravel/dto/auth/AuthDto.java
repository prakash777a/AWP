package com.tourtravel.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.tourtravel.entity.enums.UserRole;

public class AuthDto {
    @Data
    public static class RegisterRequest {
        @NotBlank private String fullName;
        @NotBlank @Email private String email;
        private String phone;
        @NotBlank private String password;
    }
    
    @Data
    public static class LoginRequest {
        @NotBlank @Email private String email;
        @NotBlank private String password;
    }
    
    @Data
    public static class AuthResponse {
        private String token;
        private UserProfileResponse user;
    }
    
    @Data
    public static class UserProfileResponse {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private UserRole role;
    }
}
