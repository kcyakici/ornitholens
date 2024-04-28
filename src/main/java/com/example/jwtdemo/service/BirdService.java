package com.example.jwtdemo.service;

import com.example.jwtdemo.dto.AlbumResponseDTO;
import com.example.jwtdemo.entity.Bird;
import com.example.jwtdemo.repository.BirdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class BirdService {

    private final String USER_DIR = System.getProperty("user.dir");
    private final String ALBUMS_PATH =  "\\src\\main\\resources\\static\\albums\\";

    @Value("${userAlbumEndpoint}")
    private String userAlbumEndpoint;
    private final BirdRepository birdRepository;

    @Autowired
    public BirdService(BirdRepository birdRepository) {
        this.birdRepository = birdRepository;
    }

    public List<AlbumResponseDTO> getImagesOfUserInAlbum(Long userId) {
        return birdRepository.getImagesOfUserInAlbum(userId);
    }

    public Bird save(Bird bird, MultipartFile multipartFile) {
        Long forumMemberId = bird.getForumMember().getId();
        Bird savedBird = birdRepository.save(bird);
        String filename = multipartFile.getOriginalFilename();
        String extensionOfFile = filename.substring(filename.indexOf("."));

        String folderPathOfTheUserAlbum = ALBUMS_PATH + forumMemberId;
        Path path = Paths.get(USER_DIR + folderPathOfTheUserAlbum);
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            System.err.println("Tried to create a new folder when user is identifying an image, but failed: " + e.getMessage());
        }

        savedBird.setPath("/" + userAlbumEndpoint + "/" + forumMemberId + "/" + savedBird.getId() + extensionOfFile);
        String pathToSaveFileLocally = USER_DIR + ALBUMS_PATH + forumMemberId + "\\" + savedBird.getId() + extensionOfFile;
        try {
            multipartFile.transferTo(new File(pathToSaveFileLocally));
        } catch (IOException e) {
            System.err.println("Failed while trying to save the image of the uploaded bird, but failed: " + e.getMessage());;
        }

        return birdRepository.save(savedBird);
    }

//    public saveToAlbum(Long userId, Long birdId) {
//
//    }
}
