package com.example.jwtdemo.repository;

import com.example.jwtdemo.entity.Bird;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BirdRepository extends JpaRepository<Bird, Long> {
    @Override
    Bird save(Bird bird);
}
