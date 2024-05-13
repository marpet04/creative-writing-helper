package hu.szte.msc.entities;

import java.util.ArrayList;
import java.util.List;

public class ChatGPTRequest {

        private String model;
        private List<Message> messages;
        private int n;
        private double temperature;
        private final int max_tokens;
        //private String system = "Viselkedj úgy, mintha egy szerepjátékos lennél és karakterneveket kell felsorolnod. A karakternevek legyenek teljes nevek, női és férfi vegyesen és a 18. századi Anglia területére legyenek jellemzőek. Csak a neveket add vissza.";
        private String system;


        public ChatGPTRequest(String model, String system, String prompt) {
            this.model = model;
            this.n = 1;
            this.system = system;
            this.max_tokens = 50;
            this.messages = new ArrayList<>();
            this.messages.add(new Message("system", system));
            this.messages.add(new Message("user", prompt));
        }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
}
