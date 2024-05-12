package hu.szte.msc.repositories;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;

import hu.szte.msc.dtos.ImageDTO;

@Service
public class GalleryRepository {
    private static final String BUCKET_NAME = "creative-writing-4c4b4.appspot.com";
    private StorageClient sClient = StorageClient.getInstance();
    private Bucket bucket = sClient.bucket();

    public ImageDTO uploadImage(MultipartFile file) throws IOException {

        String fileName = generateFileName(file);

        try (InputStream inputStream = file.getInputStream()) {
            bucket.create(fileName, inputStream, "image/png");
        }
        return new ImageDTO(fileName, getDownloadUrl(fileName));
    }

    private String generateFileName(MultipartFile file) {
        return UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    }

    private String getDownloadUrl(String fileName) {
        return "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/" + fileName + "?alt=media";
    }

    public String deleteImage(String fileName) {
        boolean deleted = bucket.get(fileName).delete();
        if (deleted) {
            return "Törlés sikeres!";
        } else {
            return "Törlés sikertelen!";
        }
    }
}
