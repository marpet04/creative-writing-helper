package hu.szte.msc.entities;

public class StoryEvent {
    private String docID;
    private String chapterID;
    private String storyID;
    private String title;
    private String note;
    private Integer index;

    public String getDocID() {
        return docID;
    }
    public void setDocID(String docID) {
        this.docID = docID;
    }
    public String getChapterID() {
        return chapterID;
    }
    public void setChapterID(String chapterID) {
        this.chapterID = chapterID;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public String getStoryID() {
        return storyID;
    }
    public void setStoryID(String storyID) {
        this.storyID = storyID;
    }
    public StoryEvent() {
    }
    public Integer getIndex() {
        return index;
    }
    public void setIndex(Integer index) {
        this.index = index;
    }
    public StoryEvent(String docID, String chapterID, String storyID, String title, String note, Integer index) {
        this.docID = docID;
        this.chapterID = chapterID;
        this.storyID = storyID;
        this.title = title;
        this.note = note;
        this.index = index;
    }

    
    

    

    

    
}
