package com.example.jwtdemo.dto;
import com.example.jwtdemo.entity.ForumMember;

import java.time.LocalDateTime;

// TODO research DTO use cases and the line when it is overused
public record ForumPostDTO(Long id, String content, LocalDateTime time, ForumMember forumMember) {
}
