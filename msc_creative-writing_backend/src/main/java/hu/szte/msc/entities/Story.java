package hu.szte.msc.entities;

public class Story {
    private String docID;
    private String title;
    private String description;
    private String author;

    public String getDocID() {
        return docID;
    }

    public void setDocID(String docID) {
        this.docID = docID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Story() {
    }

    public Story(String docID, String title, String description, String author) {
        this.docID = docID;
        this.title = title;
        this.description = description;
        this.author = author;
    }

    

    

    
}
