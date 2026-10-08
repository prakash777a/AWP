package com.tourtravel.config;

import com.tourtravel.entity.User;
import com.tourtravel.entity.enums.UserRole;
import com.tourtravel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@tourvista.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("System Admin");
            admin.setEmail("admin@tourvista.com");
            admin.setPhone("9999999999");
            admin.setPassword("admin123"); 
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("============== ADMIN CREATED ==============");
            System.out.println("Email: admin@tourvista.com");
            System.out.println("Password: admin123");
            System.out.println("==========================================");
        }
    }
}
