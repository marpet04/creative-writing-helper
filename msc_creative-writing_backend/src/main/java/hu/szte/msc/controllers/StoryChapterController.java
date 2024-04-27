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

import hu.szte.msc.entities.StoryChapter;
import hu.szte.msc.services.StoryChapterService;

@CrossOrigin
@RestController
@RequestMapping("/api/chapter")
public class StoryChapterController {
    
    @Autowired
    public StoryChapterService chapterService;

    @PostMapping("/createChapter")
    public ResponseEntity<StoryChapter> createStoryEvent(@RequestBody StoryChapter chapter) {
        return new ResponseEntity<>(chapterService.createChapter(chapter), HttpStatus.OK);
    }

    @PostMapping("/updateChapter")
    public ResponseEntity<StoryChapter> updateChapter(@RequestBody StoryChapter chapter) {
        return new ResponseEntity<>(chapterService.updateChapter(chapter), HttpStatus.OK);
    }

    @GetMapping("/getAllChapters/{storyID}")
    public ResponseEntity<List<StoryChapter>> getAllChapters(@PathVariable("storyID") String storyID) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(chapterService.getAllChapters(storyID), HttpStatus.OK);
    }

    @GetMapping("/getChapter")
    public ResponseEntity<StoryChapter> getChapter(@RequestParam String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(chapterService.getChapter(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteChapter/{id}")
    public ResponseEntity<String> deleteChapter(@PathVariable("id") String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(chapterService.deleteChapter(id), HttpStatus.OK);
    }

}
