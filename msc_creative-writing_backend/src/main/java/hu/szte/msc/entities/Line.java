package hu.szte.msc.entities;

public class Line {
    private String docID;
    private String type;
    private String start;
    private String end;
    private String color;
    private String storyID;
    public String getDocID() {
        return docID;
    }
    public void setDocID(String docID) {
        this.docID = docID;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getStart() {
        return start;
    }
    public void setStart(String start) {
        this.start = start;
    }
    public String getEnd() {
        return end;
    }
    public void setEnd(String end) {
        this.end = end;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public Line() {
    }
    public String getStoryID() {
        return storyID;
    }
    public void setStoryID(String storyID) {
        this.storyID = storyID;
    }
    public Line(String docID, String type, String start, String end, String color, String storyID) {
        this.docID = docID;
        this.type = type;
        this.start = start;
        this.end = end;
        this.color = color;
        this.storyID = storyID;
    }
    

    

    
    
    
    
    

    
}
