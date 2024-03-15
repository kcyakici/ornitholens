package com.example.jwtdemo.repository;

import com.example.jwtdemo.entity.ForumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumMemberRepository extends JpaRepository<ForumMember, Long> {
    ForumMember findFirstByEmail(String email);
}
