package com.example.jwtdemo.dto;

import lombok.Value;

@Value
public class AuthenticationRequest {
    private String email;
    private String password;
}
