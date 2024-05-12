package hu.szte.msc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hu.szte.msc.dtos.ImageDTO;
import hu.szte.msc.services.GalleryService;

@CrossOrigin
@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @PostMapping(value = "/uploadImage/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ImageDTO> uploadImage(@PathVariable("id") String id, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ImageDTO("No file uploaded", null));
        }
        try {
            ImageDTO image = galleryService.uploadImage(id, file);
            return new ResponseEntity<>(image, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ImageDTO("Error uploading image", null));
        }
    }
    @PostMapping(value = "/deleteImage/{storyID}")
    public ResponseEntity<String> deleteImage(@PathVariable("storyID") String id, @RequestParam String fileName) {
        try {
            return new ResponseEntity<>(galleryService.deleteImage(id, fileName), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting image");
        }
    }
}
