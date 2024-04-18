package hu.szte.msc.entities;

public class StoryChapter {
    private String docID;
    private String storyID;
    private String title;
    private String body;

    
    public String getDocID() {
        return docID;
    }
    public void setDocID(String docID) {
        this.docID = docID;
    }
    public String getStoryID() {
        return storyID;
    }
    public void setStoryID(String storyID) {
        this.storyID = storyID;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
    public StoryChapter() {
    }
    public StoryChapter(String docID, String storyID, String title, String body) {
        this.docID = docID;
        this.storyID = storyID;
        this.title = title;
        this.body = body;
    }

    

    

    

    
}
