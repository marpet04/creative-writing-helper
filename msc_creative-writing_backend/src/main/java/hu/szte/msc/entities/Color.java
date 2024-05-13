package hu.szte.msc.entities;

public class Color {
    private String storyID;
    private String docID;
    private String colorName;
    private String colorCode;
    private String type;
    
    public String getColorName() {
        return colorName;
    }
    public void setColorName(String colorName) {
        this.colorName = colorName;
    }
    public String getColorCode() {
        return colorCode;
    }
    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getStoryID() {
        return storyID;
    }
    public void setStoryID(String storyID) {
        this.storyID = storyID;
    }
    public String getDocID() {
        return docID;
    }
    public void setDocID(String docID) {
        this.docID = docID;
    }
    public Color(String storyID, String docID, String colorName, String colorCode, String type) {
        this.storyID = storyID;
        this.docID = docID;
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.type = type;
    }
    public Color() {
    }
    
    

    
}
