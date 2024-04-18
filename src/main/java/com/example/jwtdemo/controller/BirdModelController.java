package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.IdentificationRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
public class BirdModelController {

    private String UPLOAD_PATH = "G:\\CENG_PogChamp\\OrnithoLens\\spring-boot-rest-api-jwt\\upload-trial\\"; // TODO get relative path

    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<String> uploadFile(IdentificationRequest identificationRequest) {
        MultipartFile multipartFile = identificationRequest.imageFile();
        System.out.println("Name: " + multipartFile.getName()); // key name
        System.out.println("Content type: " + multipartFile.getContentType());
        // System.out.println("To string method result: " + multipartFile.toString());
        System.out.println("Name of the imageFile: " + multipartFile.getOriginalFilename());

        try {
            multipartFile.transferTo(new File(UPLOAD_PATH + multipartFile.getOriginalFilename()));
            return new ResponseEntity<>("File uploaded successfully.", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Exception occurred: " + e.getMessage());
            return new ResponseEntity<>("File uploading has failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
