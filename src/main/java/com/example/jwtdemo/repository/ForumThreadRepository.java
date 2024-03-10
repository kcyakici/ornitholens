package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    Optional<ForumThreadDTO> findFirstById(Long id);
    @Override
    ForumThread save(ForumThread forumThread);
}
