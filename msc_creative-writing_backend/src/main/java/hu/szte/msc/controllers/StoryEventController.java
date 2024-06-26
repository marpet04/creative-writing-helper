package hu.szte.msc.controllers;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.msc.dtos.TimelineUpdateBulkDTO;
import hu.szte.msc.dtos.TimelineUpdateDTO;
import hu.szte.msc.entities.StoryEvent;
import hu.szte.msc.services.StoryEventService;

@CrossOrigin
@RestController
@RequestMapping("/api/event")
public class StoryEventController {

    Logger logger = LoggerFactory.getLogger(StoryEventController.class);
    
    @Autowired
    public StoryEventService eventService;

    @PostMapping("/createStoryEvent")
    public ResponseEntity<StoryEvent> createStoryEvent(@RequestBody StoryEvent event) {
        return new ResponseEntity<>(eventService.createStoryEvent(event), HttpStatus.OK);
    }

    @PostMapping("/updateStoryEvent")
    public ResponseEntity<StoryEvent> updateStoryEvent(@RequestBody StoryEvent storyEvent) {
        return new ResponseEntity<>(eventService.updateStoryEvent(storyEvent), HttpStatus.OK);
    }

    @PostMapping("/updateTimeline")
    public ResponseEntity<TimelineUpdateDTO> updateTimeline(@RequestBody TimelineUpdateBulkDTO storyEvents) {
        this.logger.debug(storyEvents.toString());
        return new ResponseEntity<>(eventService.updateTimeline(storyEvents.events()), HttpStatus.OK);
    }

    @GetMapping("/getAllStoryEvents/{storyID}")
    public ResponseEntity<List<StoryEvent>> getAllEvents(@PathVariable("storyID") String storyID) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(eventService.getAllEvents(storyID), HttpStatus.OK);
    }

    @GetMapping("/getStoryEvent")
    public ResponseEntity<StoryEvent> getEvent(@RequestParam String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(eventService.getStoryEvent(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteStoryEvent/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(eventService.deleteStoryEvent(id), HttpStatus.OK);
    }

}
