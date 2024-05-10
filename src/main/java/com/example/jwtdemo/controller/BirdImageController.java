package com.example.jwtdemo.controller;

import com.example.jwtdemo.dto.AlbumResponseDTO;
import com.example.jwtdemo.dto.IdentificationGameDTO;
import com.example.jwtdemo.entity.ForumMember;
import com.example.jwtdemo.service.BirdService;
import com.example.jwtdemo.service.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class BirdImageController {
    private final String PATH = "G:\\CENG_PogChamp\\OrnithoLens\\spring-boot-rest-api-jwt\\upload-trial\\menekse.jpg";
    private final String birdImagesDirectory = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images";
    private final String HOST_URL_FOR_IMAGE = "localhost:8080\\images\\";
    private final List<String> directories = init();
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final BirdService birdService;
    @Autowired
    public BirdImageController(UserDetailsServiceImpl userDetailsServiceImpl, BirdService birdService) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.birdService = birdService;
    }
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

    @GetMapping("/identify")
    public ResponseEntity<IdentificationGameDTO> getImageAndAnswers() {
        List<String> randomAnswerList = chooseRandomAnswers();
        String correctAnswerDirectoryName = randomAnswerList.get(0);
        String image = chooseRandomImage(birdImagesDirectory + "\\" + correctAnswerDirectoryName);

        String correctAnswerParsed = parseBirdNameFromFileName(correctAnswerDirectoryName);
        List<String> randomAnswerListParsed = new ArrayList<>(randomAnswerList
                .stream()
                .map(this::parseBirdNameFromFileName)
                .toList());
        Collections.shuffle(randomAnswerListParsed);
        String imageUrlToSend = (HOST_URL_FOR_IMAGE + correctAnswerDirectoryName + "/" + image).replaceAll("\\\\", "/");

        return new ResponseEntity<>(new IdentificationGameDTO(imageUrlToSend, correctAnswerParsed, randomAnswerListParsed), HttpStatus.OK);
    }

    @GetMapping("/albums")
    public ResponseEntity<List<AlbumResponseDTO>> getImagesInAlbum(@AuthenticationPrincipal User requestingUser) {
        ForumMember forumMember = userDetailsServiceImpl.findForumMemberByUsername(requestingUser.getUsername());
        List<AlbumResponseDTO> imageList = birdService.getImagesOfUserInAlbum(forumMember.getId());
        return new ResponseEntity<>(imageList, HttpStatus.OK);
    }

    private List<String> chooseRandomAnswers() {
        assert directories != null;
        List<String> randomAnswerList = new ArrayList<>();
        List<String> allAnswers = new ArrayList<>(directories);
        Random rd = new Random();

        for (int i = 0; i < 4; i++) {
            randomAnswerList.add(allAnswers.remove(rd.nextInt(0, allAnswers.size() - 1)));
        }

        return randomAnswerList;
    }

    private String chooseRandomImage(String folderName) {
        List<String> fileNameList = getFileNames(folderName);
        Random rd = new Random();

        assert fileNameList != null;
        return fileNameList.get(rd.nextInt(0, fileNameList.size() - 1));
    }

    private List<String> init() {
        return getFileNames(birdImagesDirectory);
    }

    private List<String> getFileNames(String directory) {

//        System.out.println("Bird images directory for game: " + birdImagesDirectory);
        try {
            Stream<Path> pathStream = Files.list(Paths.get(directory));
            return pathStream
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());

        } catch (IOException exception) {
            System.err.println("Tried to read the folders but was not successful");
            return null;
        }
    }

    private String parseBirdNameFromFileName(String fileName) {
        return String.join(" ", fileName.substring(fileName.indexOf(".") + 1).split("_"));
    }
}
