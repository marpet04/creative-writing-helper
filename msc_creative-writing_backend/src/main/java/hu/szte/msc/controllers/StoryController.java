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

import hu.szte.msc.entities.Story;
import hu.szte.msc.services.StoryService;

@CrossOrigin
@RestController
@RequestMapping("/api/story")
public class StoryController {
    
    @Autowired
    public StoryService storyService;

    @PostMapping("/createStory")
    public ResponseEntity<Story> createStory(@RequestBody Story story) {
        return new ResponseEntity<>(storyService.createStory(story), HttpStatus.OK);
    }

    @GetMapping("/getAllStories")
    public ResponseEntity<List<Story>> getAllStories() throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(storyService.getAllStories(), HttpStatus.OK);
    }

}
