package com.example.jwtdemo.dto;

import java.util.List;

public record IdentificationGameDTO(String imageUrl, String correctAnswer, List<String> answers) {
}
