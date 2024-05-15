package hu.szte.msc.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.dtos.TimelineUpdateDTO;
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

    public List<StoryEvent> getAllEvents(String storyID) throws InterruptedException, ExecutionException {
        return storyEventRepository.getAllEvents(storyID);
    }

    public StoryEvent getStoryEvent(String id) throws InterruptedException, ExecutionException {
        return storyEventRepository.getStoryEvent(id);
    }

    public String deleteStoryEvent(String docID) throws InterruptedException, ExecutionException {
        return storyEventRepository.deleteStoryEvent(docID);
    }

    public TimelineUpdateDTO updateTimeline(List<StoryEvent> eventBulk) {
        try {
            return storyEventRepository.updateTimeline(eventBulk);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return new TimelineUpdateDTO("Az idővonal mentése közben hiba lépett fel!");
        
    }
    
}
