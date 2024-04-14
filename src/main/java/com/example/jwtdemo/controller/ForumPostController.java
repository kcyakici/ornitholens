package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.example.jwtdemo.utils.ConversionUtil.convertToLong;

@RestController
public class ForumPostController {
    private final ForumPostService forumPostService;

    @Autowired
    public ForumPostController(ForumPostService forumPostService) {
        this.forumPostService = forumPostService;
    }

    @CrossOrigin
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<ForumThreadDTO.ForumPostDTO> deleteForumPost(@PathVariable String postId) {
        System.out.println("Inside deleteForumPost");
        long postIdLong = convertToLong(postId);
        ForumThreadDTO.ForumPostDTO forumPostDTO = forumPostService.deleteForumPost(postIdLong);
        System.out.println("Exiting deleteForumPost");
        return new ResponseEntity<>(forumPostDTO, HttpStatus.OK);
    }
}
