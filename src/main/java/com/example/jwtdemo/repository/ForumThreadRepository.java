package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.ForumThreadWithoutPostsDTO;
import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    Optional<ForumThread> findFirstById(Long id);
    @Query("SELECT ft FROM ForumThread ft JOIN FETCH ft.forumPostList WHERE ft.id = ?1")
    Optional<ForumThread> findByIdJoinFetchPosts(Long id);
    @Query("SELECT ft FROM ForumThread ft JOIN FETCH ft.forumPostList pt JOIN FETCH pt.forumMember WHERE ft.id = ?1")
    Optional<ForumThread> findByIdJoinFetchPostsAndForumMembers(Long id);

    @Query("SELECT ft FROM ForumThread ft JOIN FETCH ft.forumPostList pt JOIN FETCH pt.forumMember WHERE ft.id = ?1")
    Optional<ForumThreadDTO> findFirstByIdWithPostsAndUsers(Long id);

    @Override
    ForumThread save(ForumThread forumThread);

    @Query("SELECT new com.example.jwtdemo.dto.ForumThreadWithoutPostsDTO(ft.id, ft.title, ft.time) FROM ForumThread ft ORDER BY ft.time DESC")
    List<ForumThreadWithoutPostsDTO> findForumThreadsExcludePosts();
    @Override
    List<ForumThread> findAll();

    @Query("SELECT MAX(fp.time) FROM ForumThread ft INNER JOIN ft.forumPostList fp WHERE ft.id = ?1")
    LocalDateTime findLastPostTimeByThreadId(Long threadId);

    @Query("SELECT fm.name FROM ForumThread ft INNER JOIN ft.forumPostList fp INNER JOIN fp.forumMember fm WHERE ft.id = ?1 ORDER BY fp.time ASC LIMIT 1")
    String findOwnerOfForumThread(Long threadId);
}
