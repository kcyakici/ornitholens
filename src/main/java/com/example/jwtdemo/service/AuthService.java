package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.SignupRequest;
import com.example.jwtdemo.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupRequest signupRequest);
}
