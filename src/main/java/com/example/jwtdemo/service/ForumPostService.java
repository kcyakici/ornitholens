package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.exception.ForumPostNotFoundException;
import com.example.jwtdemo.repository.ForumPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForumPostService {
    private final ForumPostRepository forumPostRepository;

    @Autowired
    public ForumPostService(ForumPostRepository forumPostRepository) {
        this.forumPostRepository = forumPostRepository;
    }

    public ForumThreadDTO.ForumPostDTO deleteForumPost(Long id) {
        Optional<ForumThreadDTO.ForumPostDTO> forumPostDTOOptional = forumPostRepository.findByIdFetchForumMember(id);
        ForumThreadDTO.ForumPostDTO forumPostDTO = null;

        if (forumPostDTOOptional.isPresent()) {
            forumPostDTO = forumPostDTOOptional.get();
            forumPostRepository.deleteById(id);
            return forumPostDTO;
        } else {
            throw new ForumPostNotFoundException("The forum post with id " + id + " cannot be deleted. It does not exist");
        }
    }


}
