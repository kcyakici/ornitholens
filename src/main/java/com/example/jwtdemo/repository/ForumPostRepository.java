package com.example.jwtdemo.repository;

import com.example.jwtdemo.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    @Override
    ForumPost save(ForumPost forumPost);
}
