package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    @Override
    ForumPost save(ForumPost forumPost);

    @Query("SELECT fp FROM ForumPost fp JOIN FETCH fp.forumMember WHERE fp.id = ?1")
    Optional<ForumThreadDTO.ForumPostDTO> findByIdFetchForumMember(Long id);
}
