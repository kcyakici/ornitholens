package com.example.jwtdemo.exception;

public class ForumPostNotFoundException extends RuntimeException {
    public ForumPostNotFoundException(String message) {
        super(message);
    }

}
