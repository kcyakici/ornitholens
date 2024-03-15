package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.SignupRequest;
import com.example.jwtdemo.dto.UserDTO;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.repository.ForumMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService{

    private final ForumMemberRepository forumMemberRepository;

    @Autowired
    public AuthServiceImp(ForumMemberRepository forumMemberRepository) {
        this.forumMemberRepository = forumMemberRepository;
    }

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        ForumMember forumMember = new ForumMember();
        forumMember.setEmail(signupRequest.getEmail());
        forumMember.setName(signupRequest.getName());
        forumMember.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        ForumMember createdForumMember = forumMemberRepository.save(forumMember);

        return new UserDTO(createdForumMember.getId(), createdForumMember.getEmail(), createdForumMember.getName());
    }
}
