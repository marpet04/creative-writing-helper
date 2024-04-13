package hu.szte.msc.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import hu.szte.msc.entities.StoryCharacter;

@Service
public class StoryCharacterRepository {

    private static final String CHARACTER_TABLE_NAME = "characters";
    private Firestore db = FirestoreClient.getFirestore();
    private CollectionReference COLL_REF = db.collection(CHARACTER_TABLE_NAME);
    

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

    public List<StoryCharacter> getAllCharacters() throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryCharacter> listOfCharacters = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfCharacters.add(document.toObject(StoryCharacter.class));
        }
        return listOfCharacters;
    }
    
}
