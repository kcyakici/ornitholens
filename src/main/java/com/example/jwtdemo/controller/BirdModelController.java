package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.BirdIdentificationResponse;
import com.example.jwtdemo.dto.IdentificationRequest;
import com.example.jwtdemo.entity.Bird;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.service.BirdService;
import com.example.jwtdemo.service.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestClient;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@RestController
public class BirdModelController {

    private final String USER_DIR = System.getProperty("user.dir");
    private final String ALBUMS_PATH =  "\\src\\main\\resources\\static\\albums\\";
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final BirdService birdService;

    @Autowired
    public BirdModelController(UserDetailsServiceImpl userDetailsServiceImpl, BirdService birdService) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.birdService = birdService;
    }

    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<BirdIdentificationResponse> uploadFile(IdentificationRequest identificationRequest, @AuthenticationPrincipal User requestingUser) {
        MultipartFile multipartFile = identificationRequest.imageFile();
        System.out.println("Name: " + multipartFile.getName()); // key name
        System.out.println("Content type: " + multipartFile.getContentType());
        System.out.println("Name of the imageFile: " + multipartFile.getOriginalFilename());
        String nameOfFile = multipartFile.getOriginalFilename();
        String extensionOfFile = nameOfFile.substring(nameOfFile.indexOf("."));

        ForumMember forumMember = userDetailsServiceImpl.findForumMemberByUsername(requestingUser.getUsername());
        Long forumMemberId = forumMember.getId();

        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add("image", multipartFile.getResource());

        RestClient restClient = RestClient.create();
        BirdIdentificationResponse response = restClient.post()
                .uri("http://localhost:5000/predict")
                .body(parts)
                .retrieve()
//                .body(new ParameterizedTypeReference<>() {});
//                .toEntity(String.class);
                .body(BirdIdentificationResponse.class);

        Bird bird = new Bird(response.classname(), "", LocalDateTime.now(), forumMember);
        Bird savedBird = birdService.save(bird, multipartFile);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
