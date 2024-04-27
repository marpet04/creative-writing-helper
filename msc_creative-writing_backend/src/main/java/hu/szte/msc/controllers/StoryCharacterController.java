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

import hu.szte.msc.entities.StoryCharacter;
import hu.szte.msc.services.StoryCharacterService;

@CrossOrigin
@RestController
@RequestMapping("/api/character")
public class StoryCharacterController {
    
    @Autowired
    public StoryCharacterService characterService;

    @PostMapping("/createCharacter")
    public ResponseEntity<StoryCharacter> createCharacter(@RequestBody StoryCharacter character) {
        return new ResponseEntity<>(characterService.createCharacter(character), HttpStatus.OK);
    }

    @PostMapping("/updateCharacter")
    public ResponseEntity<StoryCharacter> updateCharacter(@RequestBody StoryCharacter character) {
        return new ResponseEntity<>(characterService.updateCharacter(character), HttpStatus.OK);
    }

    @GetMapping("/getAllCharacters/{storyID}")
    public ResponseEntity<List<StoryCharacter>> getAllCharacters(@PathVariable("storyID") String storyID) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(characterService.getAllCharacters(storyID), HttpStatus.OK);
    }

    @GetMapping("/getCharacter")
    public ResponseEntity<StoryCharacter> getCharacter(@RequestParam String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(characterService.getCharacter(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteCharacter/{id}")
    public ResponseEntity<String> deleteCharacter(@PathVariable("id") String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(characterService.deleteCharacter(id), HttpStatus.OK);
    }

}
