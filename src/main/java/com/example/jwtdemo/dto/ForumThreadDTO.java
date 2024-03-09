package com.example.jwtdemo.dto;

import java.util.List;

public record ForumThreadDTO(Long id, String title, List<ForumPostDTO> forumPostDTOList) {
}
