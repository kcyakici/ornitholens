package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.AuthenticationRequest;
import com.example.jwtdemo.dto.AuthenticationResponse;
import com.example.jwtdemo.dto.PasswordChangeRequest;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.service.jwt.UserDetailsServiceImpl;
import com.example.jwtdemo.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsServiceImpl, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                                            HttpServletResponse httpServletResponse)
    throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        System.out.println("Authentication request email: " + authenticationRequest.getEmail());
        System.out.println("Authentication request password: " + authenticationRequest.getPassword());
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            System.err.println("Bad credentials exception");
            throw new BadCredentialsException("Incorrect Username or Password!");
        } catch (DisabledException e) {
            System.err.println("User is not created");
            httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created. Register user first!");
            return null;
        }
        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        System.out.println("This is the token:" + jwt);
        return new AuthenticationResponse(jwt);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal User requestingUser, @RequestBody PasswordChangeRequest passwordChangeRequest) {
        ForumMember forumMember = userDetailsServiceImpl.findForumMemberByUsername(requestingUser.getUsername());
        System.out.println("Forum Member current password: " + forumMember.getPassword());
        System.out.println("Given old password encrypted: " + passwordEncoder.encode(passwordChangeRequest.oldPassword()));
        if (!passwordEncoder.matches(passwordChangeRequest.oldPassword(), forumMember.getPassword()))
            return new ResponseEntity<>("Given old password does not match current password", HttpStatus.BAD_REQUEST);

        forumMember.setPassword(passwordEncoder.encode(passwordChangeRequest.newPassword()));
        userDetailsServiceImpl.save(forumMember);
        return ResponseEntity.ok("Password changed successfully!");
    }

}
