package hu.szte.msc.entities;

public class StoryCharacter {
    private String docID;
    private String name;
    private String storyID;
    private String chapterID;
    private String profession;
    private String birthDate;
    private String description;
    private String author;

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

    public String getStoryID() {
        return storyID;
    }

    public void setStoryID(String storyID) {
        this.storyID = storyID;
    }

    public String getChapterID() {
        return chapterID;
    }

    public void setChapterID(String chapterID) {
        this.chapterID = chapterID;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public StoryCharacter(String docID, String name, String storyID, String chapterID, String profession,
            String birthDate, String description, String author) {
        this.docID = docID;
        this.name = name;
        this.storyID = storyID;
        this.chapterID = chapterID;
        this.profession = profession;
        this.birthDate = birthDate;
        this.description = description;
        this.author = author;
    }

    public StoryCharacter() {
    }

    

    

    
}
