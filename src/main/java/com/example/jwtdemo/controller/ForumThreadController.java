package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.ForumPostCreationRequest;
import com.example.jwtdemo.dto.ForumThreadCreationRequest;
import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.dto.ForumThreadWithoutPostsDTO;
import com.example.jwtdemo.entity.ForumThread;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.entity.ForumPost;
import com.example.jwtdemo.service.ForumPostService;
import com.example.jwtdemo.service.ForumThreadService;
import com.example.jwtdemo.service.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.jwtdemo.utils.ConversionUtil.convertToLong;

@RestController
public class ForumThreadController {
    private final ForumThreadService forumThreadService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final ForumPostService forumPostService;

    @Autowired
    public ForumThreadController(ForumThreadService forumThreadService, UserDetailsServiceImpl userDetailsServiceImpl, ForumPostService forumPostService) {
        this.forumThreadService = forumThreadService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.forumPostService = forumPostService;
    }

    @GetMapping("/threads/{threadId}")
    public ResponseEntity<ForumThreadDTO> getFor(@PathVariable String threadId) {
        long threadIdLong = convertToLong(threadId);
        ForumThreadDTO forumThreadDTO = forumThreadService.getForumThreadWithPostsAndOwners(threadIdLong);
        return new ResponseEntity<>(forumThreadDTO, HttpStatus.OK);
    }

    @GetMapping("/threads")
    public ResponseEntity<List<ForumThreadWithoutPostsDTO>> getThreadList() {
        List<ForumThreadWithoutPostsDTO> forumThreadListWithoutPosts = forumThreadService.getAllForumThreadsExcludePosts();
        return new ResponseEntity<>(forumThreadListWithoutPosts, HttpStatus.OK);
    }

    @PostMapping("/threads") // TODO make return type explicit
    public ResponseEntity<?> createForumThread(@RequestBody ForumThreadCreationRequest forumThreadCreationRequest,
            @AuthenticationPrincipal User requestingUser) {
        System.out.println("Class of user: " + requestingUser.getClass());
        System.out.println("Username of the requesting user: " + requestingUser.getUsername());

        ForumMember forumMember = userDetailsServiceImpl.findForumMemberByUsername(requestingUser.getUsername());
        System.out.println("Requesting forum member: " + forumMember);
        String title = forumThreadCreationRequest.title();
        String content = forumThreadCreationRequest.content();
        LocalDateTime now = LocalDateTime.now();

        ForumPost forumPost = new ForumPost(content, forumMember, now);
        ForumThread forumThread = new ForumThread(title, now, List.of(forumPost));

        ForumThread savedForumThread = forumThreadService.saveForumThread(forumThread);
        return new ResponseEntity<ForumThread>(savedForumThread, HttpStatus.CREATED);
    }

    @PostMapping("/threads/posts")
    public ResponseEntity<?> createForumPost(@RequestBody ForumPostCreationRequest forumPostCreationRequest,
            @AuthenticationPrincipal User requestingUser) {
        String threadId = forumPostCreationRequest.threadId();
        long threadIdLong = convertToLong(threadId);
        String postContent = forumPostCreationRequest.content();
        ForumMember forumMember = userDetailsServiceImpl.findForumMemberByUsername(requestingUser.getUsername());
        LocalDateTime now = LocalDateTime.now();

        ForumThread forumThread = forumThreadService.getForumThreadJoinFetchPosts(threadIdLong);
        ForumPost newForumPost = new ForumPost(postContent, forumMember, now);
        forumThread.addPost(newForumPost);

        ForumThread createdForumThread = forumThreadService.saveForumThread(forumThread);
        System.out.println("Created forum thread: " + createdForumThread);
        return new ResponseEntity<ForumThread>(createdForumThread, HttpStatus.CREATED);
    }

    @GetMapping("threads/{threadId}/lastPostTime")
    public ResponseEntity<LocalDateTime> getLastPostTime(@PathVariable Long threadId) {
        return ResponseEntity.ok(forumThreadService.getLastPostTime(threadId));
    }

    @GetMapping("threads/{threadId}/owner")
    public ResponseEntity<String> getOwner(@PathVariable Long threadId) {
        return ResponseEntity.ok(forumThreadService.getOwner(threadId));
    }
}
