package hu.szte.msc.controllers;

import java.util.List;
import java.util.concurrent.ExecutionException;

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

    @PostMapping("/updateStory")
    public ResponseEntity<Story> updateStory(@RequestBody Story story) {
        return new ResponseEntity<>(storyService.updateStory(story), HttpStatus.OK);
    }

    @GetMapping("/getAllStories")
    public ResponseEntity<List<Story>> getAllStories() throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(storyService.getAllStories(), HttpStatus.OK);
    }

    @GetMapping("/getStory")
    public ResponseEntity<Story> getStory(@RequestParam String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(storyService.getStory(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteStory/{id}")
    public ResponseEntity<String> deleteStory(@PathVariable("id") String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(storyService.deleteStory(id), HttpStatus.OK);
    }

}
