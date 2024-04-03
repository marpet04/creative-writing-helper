package hu.szte.msc.controllers;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.msc.entities.StoryEvent;
import hu.szte.msc.services.StoryEventService;

@CrossOrigin
@RestController
@RequestMapping("/api/event")
public class StoryEventController {
    
    @Autowired
    public StoryEventService eventService;

    @PostMapping("/createStoryEvent")
    public ResponseEntity<StoryEvent> createStoryEvent(@RequestBody StoryEvent event) {
        return new ResponseEntity<>(eventService.createStoryEvent(event), HttpStatus.OK);
    }

    @GetMapping("/getAllEvents")
    public ResponseEntity<List<StoryEvent>> getAllEvents() throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

}
