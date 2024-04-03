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

import hu.szte.msc.entities.StoryEvent;

@Service
public class StoryEventRepository {

    private static final String EVENT_TABLE_NAME = "events";
    private Firestore db = FirestoreClient.getFirestore();
    private CollectionReference COLL_REF = db.collection(EVENT_TABLE_NAME);
    

    public StoryEvent createStoryEvent(StoryEvent event) {
        String docId = COLL_REF.document().getId();
        event.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(event);
        return event;
    }

    public List<StoryEvent> getAllEvents() throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryEvent> listOfEvents = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfEvents.add(document.toObject(StoryEvent.class));
        }
        return listOfEvents;
    }
    
}
