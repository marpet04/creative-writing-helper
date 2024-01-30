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

    public List<StoryCharacter> getAllCharacters() throws InterruptedException, ExecutionException {
        return characterRepository.getAllCharacters();
    }
    
}
