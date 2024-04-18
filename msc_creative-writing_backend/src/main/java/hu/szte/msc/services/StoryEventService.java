package hu.szte.msc.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.entities.StoryEvent;
import hu.szte.msc.repositories.StoryEventRepository;

@Service
public class StoryEventService {

    @Autowired
    public StoryEventRepository storyEventRepository;

    public StoryEvent createStoryEvent(StoryEvent event) {
        return storyEventRepository.createStoryEvent(event);
    }

    public StoryEvent updateStoryEvent(StoryEvent event) {
        return storyEventRepository.updateStoryEvent(event);
    }

    public List<StoryEvent> getAllEvents() throws InterruptedException, ExecutionException {
        return storyEventRepository.getAllEvents();
    }

    public StoryEvent getStoryEvent(String id) throws InterruptedException, ExecutionException {
        return storyEventRepository.getStoryEvent(id);
    }

    public String deleteStoryEvent(String docID) throws InterruptedException, ExecutionException {
        return storyEventRepository.deleteStoryEvent(docID);
    }
    
}
