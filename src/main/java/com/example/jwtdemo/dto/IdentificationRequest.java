package com.example.jwtdemo.dto;

import org.springframework.web.multipart.MultipartFile;

public record IdentificationRequest(MultipartFile imageFile) {
}
