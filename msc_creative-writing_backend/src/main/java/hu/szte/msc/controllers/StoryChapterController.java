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

    @GetMapping("/getAllChapters")
    public ResponseEntity<List<StoryChapter>> getAllChapters() throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(chapterService.getAllChapters(), HttpStatus.OK);
    }

}
