package com.example.jwtdemo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "birds")
public class Bird {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "path")
    private String path;
    @Column(name = "identification_time")
    private LocalDateTime time;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id", nullable = false)
    private ForumMember forumMember;

    public Bird() {}

    public Bird(String name, String path, LocalDateTime time, ForumMember forumMember) {
        this.name = name;
        this.path = path;
        this.time = time;
        this.forumMember = forumMember;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public ForumMember getForumMember() {
        return forumMember;
    }

    public void setForumMember(ForumMember forumMember) {
        this.forumMember = forumMember;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Bird bird)) return false;

        return Objects.equals(id, bird.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Bird{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", time=" + time +
                ", forumMember=" + forumMember +
                '}';
    }
}
