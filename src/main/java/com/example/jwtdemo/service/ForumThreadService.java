package com.example.jwtdemo.service;

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

    public ForumThread getForumThread(Long id) {
        Optional<ForumThread> optionalForumThread = forumThreadRepository.findFirstById(id);
        if(optionalForumThread.isPresent()) {
            return optionalForumThread.get();
        } else {
            throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
        }
    }

    public ForumThread getForumThreadJoinFetch(Long id) {
        Optional<ForumThread> optionalForumThread = forumThreadRepository.findByIdJoinFetchPosts(id);
        if(optionalForumThread.isPresent()) {
            return optionalForumThread.get();
        } else {
            throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
        }
    }

    public com.example.jwtdemo.entity.ForumThread saveForumThread(com.example.jwtdemo.entity.ForumThread forumThread) {
        com.example.jwtdemo.entity.ForumThread savedForumThread = forumThreadRepository.save(forumThread); // TODO don't return user details like password
        System.out.println("Forum thread saved: " + savedForumThread); // TODO delete
        return savedForumThread;
    }
}
