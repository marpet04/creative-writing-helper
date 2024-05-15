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

    public StoryChapter updateChapter(StoryChapter chapter) {
        return chapterRepository.updateChapter(chapter);
    }

    public List<StoryChapter> getAllChapters(String storyID) throws InterruptedException, ExecutionException {
        return chapterRepository.getAllChapters(storyID);
    }

    public StoryChapter getChapter(String id) {
        try {
            return chapterRepository.getChapter(id);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteChapter(String docID) {
        try {
            return chapterRepository.deleteChapter(docID);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return "A fejezet törlése során hiba lépett fel!";
    }
    
}
