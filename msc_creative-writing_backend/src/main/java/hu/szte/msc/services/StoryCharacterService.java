package hu.szte.msc.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.entities.StoryCharacter;
import hu.szte.msc.repositories.StoryCharacterRepository;

@Service
public class StoryCharacterService {

    @Autowired
    public StoryCharacterRepository characterRepository;

    public StoryCharacter createCharacter(StoryCharacter character) {
        return characterRepository.createCharacter(character);
    }

    public StoryCharacter updateCharacter(StoryCharacter character) {
        return characterRepository.updateCharacter(character);
    }

    public List<StoryCharacter> getAllCharacters(String storyID) throws InterruptedException, ExecutionException {
        return characterRepository.getAllCharacters(storyID);
    }

    public StoryCharacter getCharacter(String id) throws InterruptedException, ExecutionException {
        return characterRepository.getCharacter(id);
    }

    public String deleteCharacter(String docID) throws InterruptedException, ExecutionException {
        return characterRepository.deleteCharacter(docID);
    }
    
}
