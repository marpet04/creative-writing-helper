package hu.szte.msc.entities;

public class Color {
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
    public Color() {
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Color(String colorName, String colorCode, String type) {
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.type = type;
    }
    

    
}
