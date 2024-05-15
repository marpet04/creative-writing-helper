package hu.szte.msc.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.entities.Story;
import hu.szte.msc.repositories.StoryRepository;

@Service
public class StoryService {

    @Autowired
    public StoryRepository storyRepository;

    public Story createStory(Story story) {
        return storyRepository.createStory(story);
    }

    public Story updateStory(Story story) {
        return storyRepository.updateStory(story);
    }

    public List<Story> getAllStories(String author) {
        try {
            return storyRepository.getAllStories(author);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Story getStory(String id) {
        try {
            return storyRepository.getStory(id);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return null;
    }

    public String deleteStory(String docID) {
        try {
            return storyRepository.deleteStory(docID);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return "A Történet mentése közben hiba lépett fel!";
    }
    
}
