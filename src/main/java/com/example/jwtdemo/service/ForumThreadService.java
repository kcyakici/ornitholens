package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.ForumThreadDTO;
import com.example.jwtdemo.dto.ForumThreadWithoutPostsDTO;
import com.example.jwtdemo.entity.ForumThread;
import com.example.jwtdemo.exception.ForumThreadNotFoundException;
import com.example.jwtdemo.repository.ForumThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ForumThreadService {
    private final ForumThreadRepository forumThreadRepository;

    @Autowired
    public ForumThreadService(ForumThreadRepository forumThreadRepository) {
        this.forumThreadRepository = forumThreadRepository;
    }

    public List<ForumThreadWithoutPostsDTO> getAllForumThreadsExcludePosts() {
        System.out.println("You are here: getAllForumThreadsWithoutPosts()" );
        return forumThreadRepository.findForumThreadsExcludePosts();
    }

    public ForumThread getForumThread(Long id) {
        Optional<ForumThread> optionalForumThread = forumThreadRepository.findFirstById(id);
        if(optionalForumThread.isPresent()) {
            return optionalForumThread.get();
        } else {
            throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
        }
    }

    public ForumThread getForumThreadJoinFetchPosts(Long id) {
        Optional<ForumThread> optionalForumThread = forumThreadRepository.findByIdJoinFetchPosts(id);
        if(optionalForumThread.isPresent()) {
            return optionalForumThread.get();
        } else {
            throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
        }
    }

    public ForumThreadDTO getForumThreadWithPostsAndOwners(Long id) {
        Optional<ForumThreadDTO> optionalForumThreadDTO = forumThreadRepository.findFirstByIdWithPostsAndUsers(id);
        if (optionalForumThreadDTO.isPresent()) return optionalForumThreadDTO.get();
        else throw new ForumThreadNotFoundException("The forum thread with id: " + id + " does not exist!");
    }

    public ForumThread saveForumThread(ForumThread forumThread) {
        ForumThread savedForumThread = forumThreadRepository.save(forumThread); // TODO don't return user details like password
        System.out.println("Forum thread saved: " + savedForumThread); // TODO delete
        return savedForumThread;
    }
}
