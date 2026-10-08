package com.tourtravel.service;

import com.tourtravel.dto.user.UserDto;
import java.util.List;

public interface UserService {
    UserDto.Response createUser(UserDto.Request request);
    List<UserDto.Response> getAllUsers();
    UserDto.Response getUserById(Long id);
    UserDto.Response updateUser(Long id, UserDto.Request request);
    void deleteUser(Long id);
}
