package com.example.jwtdemo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "threads")
public class ForumThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "create_time")
    private LocalDateTime time;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id")
    private List<ForumPost> forumPostList;

    public ForumThread() {
    }

    public ForumThread(String title, LocalDateTime time, List<ForumPost> forumPostList) {
        this.title = title;
        this.time = time;
        this.forumPostList = forumPostList;
    }

    public void addPost(ForumPost forumPost) {
        if (forumPostList == null)
            forumPostList = new ArrayList<>();

        forumPostList.add(forumPost);
    }

    public void removePost(ForumPost forumPost) {
        forumPostList.remove(forumPost);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public List<ForumPost> getForumPostList() {
        return forumPostList;
    }

    public void setForumPostList(List<ForumPost> forumPostList) {
        this.forumPostList = forumPostList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ForumThread that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(title, that.title) && Objects.equals(time, that.time) && Objects.equals(forumPostList, that.forumPostList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, time, forumPostList);
    }

    @Override
    public String toString() {
        return "ForumThread{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", time=" + time +
                ", forumPostList=" + forumPostList +
                '}';
    }
}
