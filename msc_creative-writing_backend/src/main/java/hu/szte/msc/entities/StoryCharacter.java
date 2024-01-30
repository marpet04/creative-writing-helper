package hu.szte.msc.entities;

public class StoryCharacter {
    private String docID;
    private String name;
    private String profession;
    private String birthDate;
    private String description;

    public String getDocID() {
        return docID;
    }

    public void setDocID(String docID) {
        this.docID = docID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public StoryCharacter(String docID, String name, String profession, String birthDate, String description) {
        this.docID = docID;
        this.name = name;
        this.profession = profession;
        this.birthDate = birthDate;
        this.description = description;
    }

    public StoryCharacter() {
    }

    

    
}
