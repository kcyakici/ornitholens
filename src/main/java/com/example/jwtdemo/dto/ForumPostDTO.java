package com.example.jwtdemo.dto;
import com.example.jwtdemo.entity.User;

public record ForumPostDTO(Long id, String content, User user) {
}
