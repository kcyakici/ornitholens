package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumThread;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumThreadRepository extends PagingAndSortingRepository<ForumThread, Long> {
    Optional<ForumThreadDTO> findFirstById(Long id);
}
