package com.example.jwtdemo.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class BirdImageController {
    private final String PATH = "G:\\CENG_PogChamp\\OrnithoLens\\spring-boot-rest-api-jwt\\upload-trial\\menekse.jpg";
    @GetMapping(value = "/bird", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<Resource> getBirdImage() {
        ByteArrayResource resource = null;
        try {
            resource = new ByteArrayResource(Files.readAllBytes(Paths.get(PATH)));
        } catch (IOException exception) {
            System.err.println("Error occurred while trying to read the file: " + exception.getMessage());
        }

        return new ResponseEntity<Resource>(resource, HttpStatus.OK);
    }
}
