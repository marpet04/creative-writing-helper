package hu.szte.msc.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import hu.szte.msc.entities.StoryCharacter;

@Service
public class StoryCharacterRepository {

    private static final String CHARACTER_TABLE_NAME = "characters";

    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public StoryCharacterRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(CHARACTER_TABLE_NAME);
    }
    

    public StoryCharacter createCharacter(StoryCharacter character) {
        String docId = COLL_REF.document().getId();
        character.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(character);
        return character;
    }

    public StoryCharacter updateCharacter(StoryCharacter character) {
        ApiFuture<WriteResult> future = COLL_REF.document(character.getDocID()).set(character);
        return character;
    }

    public List<StoryCharacter> getAllCharacters(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryCharacter> listOfCharacters = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfCharacters.add(document.toObject(StoryCharacter.class));
        }
        return listOfCharacters;
    }

    public StoryCharacter getCharacter(String id) throws InterruptedException, ExecutionException {
        DocumentReference ref = COLL_REF.document(id);
        DocumentSnapshot document = ref.get().get();
        StoryCharacter character = document.toObject(StoryCharacter.class);
        return character;
    }

    public String deleteCharacter(String docID) {
        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        try {
            future.get();
            return "Character successfully deleted!";
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;  
    }
    
}
