package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.ForumThreadCreationRequest;
import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumPost;
import com.example.jwtdemo.entity.ForumThread;
import com.example.jwtdemo.entity.User;
import com.example.jwtdemo.service.ForumThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class ForumController {
    private final ForumThreadService forumThreadService;

    @Autowired
    public ForumController(ForumThreadService forumThreadService) {
        this.forumThreadService = forumThreadService;
    }

    @PostMapping("/threads")
    public ResponseEntity<?> createForumThread(@RequestBody ForumThreadCreationRequest forumThreadCreationRequest) {
        String title = forumThreadCreationRequest.title();
        String content = forumThreadCreationRequest.content();
        LocalDateTime now = LocalDateTime.now();
        User user = new User("posttest", "posttest@posttest.com", "posttest");

        ForumPost forumPost = new ForumPost(content, user, now);
        ForumThread forumThread = new ForumThread(title, now, List.of(forumPost));

        ForumThread savedForumThread = forumThreadService.saveForumThread(forumThread);
        return new ResponseEntity<ForumThread>(forumThread, HttpStatus.CREATED);
    }
}
