package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.SignupRequest;
import com.example.jwtdemo.dto.UserDTO;
import com.example.jwtdemo.entity.User;
import com.example.jwtdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService{

    private final UserRepository userRepository;

    @Autowired
    public AuthServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        User createdUser = userRepository.save(user);

        return new UserDTO(createdUser.getId(), createdUser.getEmail(), createdUser.getName());
    }
}
