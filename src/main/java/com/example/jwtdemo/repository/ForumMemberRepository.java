package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.ForumMemberWithScoreDTO;
import com.example.jwtdemo.entity.ForumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumMemberRepository extends JpaRepository<ForumMember, Long> {
    ForumMember findFirstByEmail(String email);

    @Query("SELECT fm.score FROM ForumMember fm WHERE fm.id = ?1")
    Integer getScore(Long id);

    @Modifying
    @Query("UPDATE ForumMember fm SET fm.score = ?2 WHERE fm.id = ?1")
    void updateScore(Long id, int newScore);
}
