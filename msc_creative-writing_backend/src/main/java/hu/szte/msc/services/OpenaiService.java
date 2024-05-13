package hu.szte.msc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import hu.szte.msc.dtos.MessageFailedException;
import hu.szte.msc.entities.ChatGPTRequest;
import hu.szte.msc.entities.ChatGPTResponse;

@Service
public class OpenaiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String CHAT_GPT_FAILED = "The ChatBot cannot answer this!";

    public String getOpenaiResponse(String input, String system) throws MessageFailedException {
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(model, input, system);
        // Prepare HTTP request
        String requestUrl = apiUrl;
        String requestBody = "{\"prompt\": \"" + input + "\"}";


        // Add API key to headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Make HTTP POST request
        HttpEntity<ChatGPTRequest> entity = new HttpEntity<>(chatGPTRequest, headers);
        ResponseEntity<ChatGPTResponse> response = new RestTemplate().postForEntity(requestUrl, entity, ChatGPTResponse.class);
        //ChatGPTResponse response = restTemplate.postForObject(requestUrl, entity)

        String evaulatedResponse = evaluateResponse(response.getBody());
        return evaulatedResponse;
    }

    private String evaluateResponse(ChatGPTResponse response) throws MessageFailedException {
        checkResponse(response);
        return response.getChoices().get(0).getMessage().getContent();
    }

    private void checkResponse(ChatGPTResponse response) throws MessageFailedException {
        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            throw new MessageFailedException(CHAT_GPT_FAILED);
        }
    }

}
