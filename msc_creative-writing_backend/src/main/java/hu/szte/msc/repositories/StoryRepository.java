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

import hu.szte.msc.entities.Story;

@Service
public class StoryRepository {

    private static final String STORY_TABLE_NAME = "stories";
    private Firestore db = FirestoreClient.getFirestore();
    private CollectionReference COLL_REF = db.collection(STORY_TABLE_NAME);
    

    public Story createStory(Story story) {
        String docId = COLL_REF.document().getId();
        story.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(story);
        return story;
    }

    public List<Story> getAllStories() throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Story> listOfStories = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfStories.add(document.toObject(Story.class));
        }
        return listOfStories;
    }
    
}
