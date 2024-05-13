package hu.szte.msc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import hu.szte.msc.services.OpenaiService;

@CrossOrigin
@RestController
@RequestMapping("/api/chatgpt")
public class AIController {
    @Autowired
    OpenaiService openaiService;

    private String CHAPTER_ANALYSIS = "A kapott üzenetben számold össze a szavak számát (a szóköz legyen a szavakat elválasztó karakter), " +  
    "számítsd ki, hogy mennyi A/4-es oldalnak felelne meg Times New Roman 12-es betűmérettel, 1-szeres sorközzel, " + 
    "és adj egy analízist a kapott fejezetről, ami tartalmazza a lehetséges javításokat, ötleteket." + 
    "Az ötletek száma ne haladja meg a 3-at és a javítások grammatikai és szerkesztési javaslatok legyenek. A következő formátumban add vissza a választ: " +
    "Szavak száma: ... [sortörés], A/4-es oldalak száma: ... [sortörés], Analízis: ... [sortörés] . A válaszban csak ezek legyenek és ne haladja meg a 10 mondatot.";

    @PostMapping("/public/char-name")
    public ResponseEntity<String> sendMessageCharName(@RequestBody String value) {
        String response = null;
        try {
            String system = "Viselkedj úgy, mintha egy szerepjátékos lennél és karakterneveket kell felsorolnod. A karakternevek legyenek teljes nevek, női és férfi vegyesen és a " + value + " műfajra legyenek jellemzőek. Csak az 5 nevet add vissza.";
            response = openaiService.getOpenaiResponse("", system);

        }catch (Exception e){
            System.err.println(e.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/public/description")
    public ResponseEntity<String> sendMessageDescription(@RequestBody String value) {
        String response = null;
        try {
            String system = "Viselkedj úgy, mintha egy szerepjátékos lennél. Generálj egy karakternevet és egy leírást a karakternévnek 5-6 mondatban, ami a " + value + " műfajra legyen jellemző. Csak a nevet és a leírást add vissza.";
            response = openaiService.getOpenaiResponse("", system);

        }catch (Exception e){
            System.err.println(e.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/analysis")
    public ResponseEntity<String> sendMessageChapterAnalysis(@RequestBody String chapter) {
        String response = null;
        try {
            String system = CHAPTER_ANALYSIS;
            response = openaiService.getOpenaiResponse(chapter, system);

        }catch (Exception e){
            System.err.println(e.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
