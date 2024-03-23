package com.example.jwtdemo.dto;

import java.time.LocalDateTime;

public record ForumThreadWithoutPostsDTO(Long id, String title, LocalDateTime time) {
}
