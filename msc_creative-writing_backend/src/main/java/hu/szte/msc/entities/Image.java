package hu.szte.msc.entities;

public class Image {
    private String fileName;
    private String url;
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public Image() {
    }
    public Image(String fileName, String url) {
        this.fileName = fileName;
        this.url = url;
    }   
}
