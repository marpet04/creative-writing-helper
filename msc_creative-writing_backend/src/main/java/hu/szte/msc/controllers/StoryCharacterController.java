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
import org.springframework.web.bind.annotation.RestController;

import hu.szte.msc.entities.StoryCharacter;
import hu.szte.msc.services.StoryCharacterService;

@CrossOrigin
@RestController
public class StoryCharacterController {
    
    @Autowired
    public StoryCharacterService characterService;

    @PostMapping("/createCharacter")
    public ResponseEntity<StoryCharacter> createCharacter(@RequestBody StoryCharacter character) {
        return new ResponseEntity<>(characterService.createCharacter(character), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<StoryCharacter>> getAllCharacters() throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(characterService.getAllCharacters(), HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("The endpoint is working", HttpStatus.OK);
    }

}
