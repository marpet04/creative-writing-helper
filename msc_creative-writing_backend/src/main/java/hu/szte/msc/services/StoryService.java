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

    public List<Story> getAllStories() throws InterruptedException, ExecutionException {
        return storyRepository.getAllStories();
    }
    
}