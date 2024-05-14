package hu.szte.msc.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import hu.szte.msc.dtos.ImageDTO;
import hu.szte.msc.entities.Gallery;
import hu.szte.msc.entities.Image;
import hu.szte.msc.entities.Story;
import hu.szte.msc.repositories.GalleryRepository;

@Service
public class GalleryService {

    Logger logger = LoggerFactory.getLogger(GalleryService.class);

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private StoryService storyService;
    
    public ImageDTO uploadImage(String id, MultipartFile file) throws IOException {
        try {
            ImageDTO imageDTO = galleryRepository.uploadImage(file);
            Story story = storyService.getStory(id);
            List<Image> images = story.getGallery().getImages();
            List<ImageDTO> dtos = new ArrayList<>();
            Image uploadedImage = new Image(imageDTO.fileName(), imageDTO.imageUrl());
            images.add(uploadedImage);
            for (Image im : images) {
                dtos.add(new ImageDTO(im.getFileName(), im.getUrl()));
            }
            story.setGallery(new Gallery(images));
            storyService.updateStory(story);
            return imageDTO;
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        
        return null;
    }

    public String deleteImage(String storyID, String fileName) {
        try {
            Story story = storyService.getStory(storyID);
            List<Image> images = story.getGallery().getImages();
            
            Image imageToRemove = null;
            for (Image image : images) {
                this.logger.debug(image.getFileName());
                if (fileName.equals(image.getFileName())) {
                    imageToRemove = image;
                    this.logger.debug("Found file, fileName: " + fileName);
                    break;
                }
            }
            
            if (imageToRemove != null) {
                images.remove(imageToRemove);
                this.logger.debug("-------Sikeres törlés?: " + fileName);
                for (Image im : images) {
                    this.logger.debug(im.getFileName());
                }
                story.setGallery(new Gallery(images));
                storyService.updateStory(story);
                return galleryRepository.deleteImage(fileName);
            } else {
                this.logger.debug("Nem található a kép a galériában: " + fileName);
                return "Nem található a kép a galériában: " + fileName;
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return "A törlés során hiba lépett fel";
    }

}
