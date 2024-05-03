package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.AuthenticationRequest;
import com.example.jwtdemo.dto.AuthenticationResponse;
import com.example.jwtdemo.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
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
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        System.out.println("This is the token:" + jwt);
        return new AuthenticationResponse(jwt);
    }

}
