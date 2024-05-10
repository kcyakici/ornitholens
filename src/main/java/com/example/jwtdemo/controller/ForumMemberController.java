package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.ForumMemberWithScoreDTO;
import com.example.jwtdemo.dto.ScoreUpdateRequest;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.entity.Rank;
import com.example.jwtdemo.service.RankService;
import com.example.jwtdemo.service.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class ForumMemberController {
    private final UserDetailsServiceImpl userDetailsService;
    private final RankService rankService;

    @Autowired
    public ForumMemberController(UserDetailsServiceImpl userDetailsService, RankService rankService) {
        this.userDetailsService = userDetailsService;
        this.rankService = rankService;
    }

    @GetMapping("/score")
    public ResponseEntity<Integer> getUserScore(@AuthenticationPrincipal User requestingUser) {
        ForumMember forumMember = userDetailsService.findForumMemberByUsername(requestingUser.getUsername());
        Integer score = userDetailsService.getForumMemberScore(forumMember.getId());
        System.out.println("Fetched user score: " + score);
        return ResponseEntity.ok(score);
    }

    @CrossOrigin
    @PutMapping("/updateScore")
    public ResponseEntity<String> updateScore(@AuthenticationPrincipal User requestingUser, @RequestBody ScoreUpdateRequest scoreUpdateRequest) {
        ForumMember forumMember = userDetailsService.findForumMemberByUsername(requestingUser.getUsername());
        int newScore = scoreUpdateRequest.newScore();
        forumMember.setScore(newScore);
        System.out.println("New score to be set: " + newScore);
        userDetailsService.save(forumMember);
        return ResponseEntity.ok("Updated score");
    }

    @GetMapping("/rank")
    public ResponseEntity<String> getRank(@AuthenticationPrincipal User requestingUser) {
        ForumMember forumMember = userDetailsService.findForumMemberByUsername(requestingUser.getUsername());
        Rank rank = rankService.findRankByScore(forumMember.getScore());
        return ResponseEntity.ok(rank.getRankName());
    }
}
