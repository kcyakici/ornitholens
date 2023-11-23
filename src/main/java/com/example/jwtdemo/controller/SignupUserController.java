package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.SignupRequest;
import com.example.jwtdemo.dto.UserDTO;
import com.example.jwtdemo.entity.User;
import com.example.jwtdemo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupUserController {
    private final AuthService authService;

    @Autowired
    public SignupUserController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody SignupRequest signupRequest) {
        UserDTO createdUser = authService.createUser(signupRequest);
        if (createdUser == null)
            return new ResponseEntity<>("User is not created", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
