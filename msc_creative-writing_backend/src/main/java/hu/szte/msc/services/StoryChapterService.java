package hu.szte.msc.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.entities.StoryChapter;
import hu.szte.msc.repositories.StoryChapterRepository;

@Service
public class StoryChapterService {

    @Autowired
    public StoryChapterRepository chapterRepository;

    public StoryChapter createChapter(StoryChapter chapter) {
        return chapterRepository.createChapter(chapter);
    }

    public List<StoryChapter> getAllChapters() throws InterruptedException, ExecutionException {
        return chapterRepository.getAllChapters();
    }
    
}
