package com.example.jwtdemo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

public class ForumThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "create_time")
    private LocalDateTime time;
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "post_id")
    private List<ForumPost> forumPostList;
}
