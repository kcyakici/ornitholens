package com.example.jwtdemo.dto;

import java.time.LocalDateTime;

public record AlbumResponseDTO(Long id, String name, String path, LocalDateTime time) {
}
