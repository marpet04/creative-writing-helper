package hu.szte.msc.entities;

import java.util.List;

public class Gallery {
    private List<Image> images;

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Gallery() {
    }

    public Gallery(List<Image> images) {
        this.images = images;
    }

    

    
}
