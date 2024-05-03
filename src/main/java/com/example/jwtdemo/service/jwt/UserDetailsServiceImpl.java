package com.example.jwtdemo.service.jwt;

import com.example.jwtdemo.dto.ForumMemberWithScoreDTO;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.repository.ForumMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ForumMemberRepository forumMemberRepository;

    @Autowired
    public UserDetailsServiceImpl(ForumMemberRepository forumMemberRepository) {
        this.forumMemberRepository = forumMemberRepository;
    }

    public Integer getForumMemberScore(Long id) {
        return forumMemberRepository.getScore(id);
    }

    public void updateScore(Long id, int newScore) {
        forumMemberRepository.updateScore(id, newScore);
    }

    public void save(ForumMember forumMember) {
        forumMemberRepository.save(forumMember);
    }

    public ForumMember findForumMemberByUsername(String email) {
        return getForumMember(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ForumMember forumMember = getForumMember(email);
        return new User(forumMember.getEmail(), forumMember.getPassword(), new ArrayList<>());
    }

    private ForumMember getForumMember(String email) {
        ForumMember forumMember = forumMemberRepository.findFirstByEmail(email);
        if (forumMember == null)
            throw new UsernameNotFoundException("User not found", null);
        return forumMember;
    }
}
