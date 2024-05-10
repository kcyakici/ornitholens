package com.example.jwtdemo.repository;

import com.example.jwtdemo.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RankRepository extends JpaRepository<Rank, Long> {
    @Query("SELECT r FROM Rank r WHERE r.minScore <= ?1 AND r.maxScore >= ?1")
    Rank findRankByScore(int score);
}
