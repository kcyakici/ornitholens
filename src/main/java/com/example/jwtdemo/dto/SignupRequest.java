package com.example.jwtdemo.dto;

import lombok.Value;

@Value
public class SignupRequest {
    private String name;
    private String email;
    private String password;
}
