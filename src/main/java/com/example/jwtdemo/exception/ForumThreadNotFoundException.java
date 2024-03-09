package com.example.jwtdemo.exception;

public class ForumThreadNotFoundException extends RuntimeException {
    public ForumThreadNotFoundException(String message) {
        super(message);
    }

}
