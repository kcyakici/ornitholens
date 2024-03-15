package com.example.jwtdemo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "posts")
public class ForumPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "content")
    private String content;
    @Column(name = "create_time")
    private LocalDateTime time;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id", nullable = false)
    private ForumMember forumMember;

    public ForumPost() {}

    public ForumPost(String content, ForumMember forumMember, LocalDateTime time) {
        this.content = content;
        this.forumMember = forumMember;
        this.time = time;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ForumMember getForumMember() {
        return forumMember;
    }

    public void setForumMember(ForumMember forumMember) {
        this.forumMember = forumMember;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ForumPost forumPost)) return false;
        return Objects.equals(id, forumPost.id) && Objects.equals(content, forumPost.content) && Objects.equals(time, forumPost.time) && Objects.equals(forumMember, forumPost.forumMember);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content, time, forumMember);
    }

    @Override
    public String toString() {
        return "ForumPost{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", user=" + forumMember +
                '}';
    }
}
