package hu.szte.msc.entities;
import java.util.List;

public class ChatGPTResponse {

    private List<Choice> choices;

    public ChatGPTResponse() {
    }

    public ChatGPTResponse(List<Choice> choices) {
        this.choices = choices;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    
// constructors, getters and setters

    @Override
    public String toString() {
        return "ChatGPTResponse [choices=" + choices + "]";
    }


    public static class Choice {

        private int index;
        private Message message;

        public int getIndex() {
            return index;
        }

        public void setIndex(int index) {
            this.index = index;
        }

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        @Override
        public String toString() {
            return "Choice [index=" + index + ", message=" + message + "]";
        }

        
    }
}
