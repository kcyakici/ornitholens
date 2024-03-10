package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.entity.ForumThread;
import com.example.jwtdemo.exception.ForumThreadNotFoundException;
import com.example.jwtdemo.repository.ForumThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForumThreadService {
    private final ForumThreadRepository forumThreadRepository;

    @Autowired
    public ForumThreadService(ForumThreadRepository forumThreadRepository) {
        this.forumThreadRepository = forumThreadRepository;
    }

    public ForumThreadDTO getForumThread(Long id) {
        Optional<ForumThreadDTO> optionalForumThreadDTO = forumThreadRepository.findFirstById(id);
        if(optionalForumThreadDTO.isPresent()) {
            return optionalForumThreadDTO.get();
        } else {
            throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
        }
    }

    public ForumThread saveForumThread(ForumThread forumThread) {
        ForumThread savedForumThread = forumThreadRepository.save(forumThread);
        System.out.println("Forum thread saved: " + savedForumThread); // TODO delete
        return savedForumThread;
    }
}
