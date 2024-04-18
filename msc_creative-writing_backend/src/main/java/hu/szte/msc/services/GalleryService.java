package hu.szte.msc.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import hu.szte.msc.repositories.GalleryRepository;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;
    
    public String uploadImage(MultipartFile file) throws IOException {
        return galleryRepository.uploadImage(file);
    }

}
