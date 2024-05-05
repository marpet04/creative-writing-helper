package hu.szte.msc.entities;

public class CharacterPosition {
    private String objectId;
    private Long positionX;
    private Long positionY;
    private String docID;
    private String storyID;
    private String type;
    public String getObjectId() {
        return objectId;
    }
    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }
    public Long getPositionX() {
        return positionX;
    }
    public void setPositionX(Long positionX) {
        this.positionX = positionX;
    }
    public Long getPositionY() {
        return positionY;
    }
    public void setPositionY(Long positionY) {
        this.positionY = positionY;
    }
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
    public CharacterPosition() {
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public CharacterPosition(String objectId, Long positionX, Long positionY, String docID, String storyID,
            String type) {
        this.objectId = objectId;
        this.positionX = positionX;
        this.positionY = positionY;
        this.docID = docID;
        this.storyID = storyID;
        this.type = type;
    }
    

    
    
}
