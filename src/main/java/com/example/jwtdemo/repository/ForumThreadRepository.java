package com.example.jwtdemo.repository;

import com.example.jwtdemo.entity.ForumThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    Optional<ForumThread> findFirstById(Long id);
    @Query("SELECT ft FROM ForumThread ft JOIN FETCH ft.forumPostList WHERE ft.id = ?1")
    Optional<ForumThread> findByIdJoinFetchPosts(Long id);
    ForumThread save(ForumThread forumThread);


}
