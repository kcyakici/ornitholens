package com.example.jwtdemo.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
}
