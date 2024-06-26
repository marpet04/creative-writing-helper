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

import hu.szte.msc.entities.Story;

@Service
public class StoryRepository {

    private static final String STORY_TABLE_NAME = "stories";
    private static final String CHAPTER_TABLE_NAME = "chapters";
    private static final String CHARACTER_TABLE_NAME = "characters";
    private static final String EVENT_TABLE_NAME = "events";


    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public StoryRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(STORY_TABLE_NAME);
    }
    

    public Story createStory(Story story) {
        String docId = COLL_REF.document().getId();
        story.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(story);
        return story;
    }

    public Story updateStory(Story story) {
        ApiFuture<WriteResult> future = COLL_REF.document(story.getDocID()).set(story);
        return story;
    }

    public List<Story> getAllStories(String author) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("author", author).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Story> listOfStories = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfStories.add(document.toObject(Story.class));
        }
        return listOfStories;
    }

    public Story getStory(String id) throws InterruptedException, ExecutionException {
        DocumentReference ref = COLL_REF.document(id);
        DocumentSnapshot document = ref.get().get();
        Story story = document.toObject(Story.class);
        return story;
    }

    public String deleteStory(String docID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future_character = this.firestore.collection(CHARACTER_TABLE_NAME).whereEqualTo("storyID", docID).get();
        ApiFuture<QuerySnapshot> future_event = this.firestore.collection(EVENT_TABLE_NAME).whereEqualTo("storyID", docID).get();
        ApiFuture<QuerySnapshot> future_chapter = this.firestore.collection(CHAPTER_TABLE_NAME).whereEqualTo("storyID", docID).get();

        List<QueryDocumentSnapshot> documentsCharacters = future_character.get().getDocuments();
        for (DocumentSnapshot document : documentsCharacters) {
            this.firestore.collection(CHARACTER_TABLE_NAME).document(document.getId()).delete();
        }
        List<QueryDocumentSnapshot> documentsEvents = future_event.get().getDocuments();
        for (DocumentSnapshot document : documentsEvents) {
            this.firestore.collection(EVENT_TABLE_NAME).document(document.getId()).delete();
        }
        List<QueryDocumentSnapshot> documentsChapters = future_chapter.get().getDocuments();
        for (DocumentSnapshot document : documentsChapters) {
            this.firestore.collection(CHAPTER_TABLE_NAME).document(document.getId()).delete();
        }

        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        future.get();
        return "Történet törlése sikeres!";
    }
    
}
