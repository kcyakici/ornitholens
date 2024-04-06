package com.example.jwtdemo.dto;

import com.example.jwtdemo.entity.ForumPost;

import java.time.LocalDateTime;
import java.util.List;

public interface ForumThreadDTO {
    Long getId();
    String getTitle();
    LocalDateTime getTime();
    List<ForumPostDTO> getForumPostList();

    interface ForumPostDTO {
        Long getId();
        String getContent();
        LocalDateTime getTime();
        ForumMemberDTO getForumMember();

        interface ForumMemberDTO {
            Long getId();
            String getName();
            String getEmail();
        }
    }

}
