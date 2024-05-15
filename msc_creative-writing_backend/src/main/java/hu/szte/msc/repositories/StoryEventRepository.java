package hu.szte.msc.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteBatch;
import com.google.cloud.firestore.WriteResult;

import hu.szte.msc.dtos.TimelineUpdateDTO;
import hu.szte.msc.entities.StoryEvent;

@Service
public class StoryEventRepository {

    Logger logger = LoggerFactory.getLogger(StoryEventRepository.class);

    private static final String EVENT_TABLE_NAME = "events";
    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public StoryEventRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(EVENT_TABLE_NAME);
    }
    

    public StoryEvent createStoryEvent(StoryEvent event) {
        String docId = COLL_REF.document().getId();
        event.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(event);
        return event;
    }

    public StoryEvent updateStoryEvent(StoryEvent event) {
        ApiFuture<WriteResult> future = COLL_REF.document(event.getDocID()).set(event);
        return event;
    }

    public List<StoryEvent> getAllEvents(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryEvent> listOfEvents = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfEvents.add(document.toObject(StoryEvent.class));
        }
        return listOfEvents;
    }

    public StoryEvent getStoryEvent(String id) throws InterruptedException, ExecutionException {
        DocumentReference ref = COLL_REF.document(id);
        DocumentSnapshot document = ref.get().get();
        StoryEvent event = document.toObject(StoryEvent.class);
        return event;
    }

    public String deleteStoryEvent(String docID) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        future.get();
        return "Esemény törlése sikeres!";
    }

    public TimelineUpdateDTO updateTimeline(List<StoryEvent> eventBulk) throws InterruptedException, ExecutionException {

        WriteBatch batch = this.firestore.batch();

        for (StoryEvent event : eventBulk) {
            DocumentReference eventRef = COLL_REF.document(event.getDocID());
            batch.set(eventRef, event);
        }

        ApiFuture<List<WriteResult>> future = batch.commit();
  
        for (WriteResult result : future.get()) {
            this.logger.debug("Update time : " + result.getUpdateTime());
        }

        return new TimelineUpdateDTO("Az idővonal mentése sikeres volt!");

    }
    
}
