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

    public List<StoryCharacter> getAllCharacters(String storyID) {
        try {
            return characterRepository.getAllCharacters(storyID);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public StoryCharacter getCharacter(String id) {
        try {
            return characterRepository.getCharacter(id);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteCharacter(String docID) {
        try {
            return characterRepository.deleteCharacter(docID);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return "A Karakter törlése során hiba lépett fel!";
    }
    
}
