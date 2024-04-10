package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.IdentificationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class BirdModelController {
    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<String> uploadFile(IdentificationRequest identificationRequest) {
        MultipartFile multipartFile = identificationRequest.imageFile();
        System.out.println("Name: " + multipartFile.getName()); // key name
        System.out.println("Content type: " + multipartFile.getContentType());
        // System.out.println("To string method result: " + multipartFile.toString());
        System.out.println("Name of the imageFile: " + multipartFile.getOriginalFilename());

        return new ResponseEntity<>("File is received successfully", HttpStatus.OK);
    }
}
