package com.example.jwtdemo.dto;

import com.example.jwtdemo.entity.ForumPost;

import java.time.LocalDateTime;
import java.util.List;

public record ForumThreadDTO(Long id, String title, LocalDateTime time, List<ForumPost> forumPostList) {
}
