package com.example.jwtdemo.repository;

import com.example.jwtdemo.dto.AlbumResponseDTO;
import com.example.jwtdemo.entity.Bird;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BirdRepository extends JpaRepository<Bird, Long> {
    @Override
    Bird save(Bird bird);

    @Query("SELECT new com.example.jwtdemo.dto.AlbumResponseDTO(b.id, b.name, b.path, b.time) FROM Bird b WHERE b.forumMember.id = ?1")
    List<AlbumResponseDTO> getImagesOfUserInAlbum(Long userId);
}
