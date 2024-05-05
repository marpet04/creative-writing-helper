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
import org.springframework.web.bind.annotation.RestController;

import hu.szte.msc.entities.CharacterPosition;
import hu.szte.msc.entities.Line;
import hu.szte.msc.repositories.ConfigurationRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/config")
public class ConfigurationController {
    
    @Autowired
    public ConfigurationRepository configurationRepository;

    @PostMapping("/createLine")
    public ResponseEntity<Line> createConfig(@RequestBody Line line) {
        return new ResponseEntity<>(configurationRepository.createLine(line), HttpStatus.OK);
    }

    @PostMapping("/updateLine")
    public ResponseEntity<Line> updateLine(@RequestBody Line line) {
        return new ResponseEntity<>(configurationRepository.updateLine(line), HttpStatus.OK);
    }

    @GetMapping("/getAllLines/{storyID}")
    public ResponseEntity<List<Line>> getAllLines(@PathVariable("storyID") String storyID) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(configurationRepository.getAllLines(storyID), HttpStatus.OK);
    }

    @PostMapping("/createCharPos")
    public ResponseEntity<CharacterPosition> createCharacterPosition(@RequestBody CharacterPosition characterPosition) {
        return new ResponseEntity<>(configurationRepository.createCharacterPosition(characterPosition), HttpStatus.OK);
    }

    @GetMapping("/getAllCharPos/{storyID}")
    public ResponseEntity<List<CharacterPosition>> getAllCharacterPositions(@PathVariable("storyID") String storyID) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(configurationRepository.getAllCharacterPositions(storyID), HttpStatus.OK);
    }

    @PostMapping("/updateCharPos")
    public ResponseEntity<CharacterPosition> updateCharacterPosition(@RequestBody CharacterPosition charPos) {
        return new ResponseEntity<>(configurationRepository.updateCharPos(charPos), HttpStatus.OK);
    }

    @DeleteMapping("/removeLine/{id}")
    public ResponseEntity<String> removeLine(@PathVariable("id") String id) throws InterruptedException, ExecutionException {
        return new ResponseEntity<>(configurationRepository.removeLine(id), HttpStatus.OK);
    }

}
