package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.exception.InvalidIdException;
import com.example.jwtdemo.service.ForumThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ForumThreadController {
    private final ForumThreadService forumThreadService;

    @Autowired
    public ForumThreadController(ForumThreadService forumThreadService) {
        this.forumThreadService = forumThreadService;
    }
    @GetMapping("/{threadId}")
    public ResponseEntity<ForumThreadDTO> getForumThread(@PathVariable String threadId) {
        long threadIdLong;
        try {
            threadIdLong = Long.parseLong(threadId);
        } catch (NumberFormatException numberFormatException) {
            throw new InvalidIdException("Thread id : " + threadId + " is not a valid id");
        }
        ForumThreadDTO forumThreadDTO = forumThreadService.getForumThread(threadIdLong);
        return new ResponseEntity<>(forumThreadDTO, HttpStatus.FOUND);
    }
}
