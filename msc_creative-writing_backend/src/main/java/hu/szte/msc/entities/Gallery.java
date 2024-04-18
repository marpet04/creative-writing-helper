package hu.szte.msc.entities;

import java.util.List;

public class Gallery {
    private List<String> images;

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Gallery() {
    }

    public Gallery(List<String> images) {
        this.images = images;
    }

    

    
}
