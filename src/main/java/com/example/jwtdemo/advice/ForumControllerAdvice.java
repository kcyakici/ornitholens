package com.example.jwtdemo.advice;

import com.example.jwtdemo.exception.ForumPostNotFoundException;
import com.example.jwtdemo.exception.ForumThreadNotFoundException;
import com.example.jwtdemo.exception.InvalidIdException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ForumControllerAdvice {
    @ExceptionHandler(value = InvalidIdException.class)
    public ResponseEntity<String> handleInvalidId(InvalidIdException invalidIdException) {
        return new ResponseEntity<>(invalidIdException.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = ForumThreadNotFoundException.class)
    public ResponseEntity<String> handleInvalidId(ForumThreadNotFoundException forumThreadNotFoundException) {
        return new ResponseEntity<>(forumThreadNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = ForumPostNotFoundException.class)
    public ResponseEntity<String> handleInvalidPostId(ForumPostNotFoundException forumPostNotFoundException) {
        return new ResponseEntity<>(forumPostNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
    }
}
