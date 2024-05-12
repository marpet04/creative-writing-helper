package hu.szte.msc.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import hu.szte.msc.entities.StoryChapter;

@Service
public class StoryChapterRepository {

    private static final String CHAPTER_TABLE_NAME = "chapters";
    private static final String CHARACTER_TABLE_NAME = "characters";
    private static final String EVENT_TABLE_NAME = "events";

    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public StoryChapterRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(CHAPTER_TABLE_NAME);
    }
    

    public StoryChapter createChapter(StoryChapter chapter) {
        String docId = COLL_REF.document().getId();
        chapter.setDocID(docId);
        chapter.setLastUpdated(Timestamp.now());
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(chapter);
        return chapter;
    }

    public StoryChapter updateChapter(StoryChapter chapter) {
        chapter.setLastUpdated(Timestamp.now());
        ApiFuture<WriteResult> future = COLL_REF.document(chapter.getDocID()).set(chapter);
        return chapter;
    }

    public List<StoryChapter> getAllChapters(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryChapter> listOfChapters = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfChapters.add(document.toObject(StoryChapter.class));
        }
        return listOfChapters;
    }

    public StoryChapter getChapter(String id) throws InterruptedException, ExecutionException {
        DocumentReference ref = COLL_REF.document(id);
        DocumentSnapshot document = ref.get().get();
        StoryChapter chapter = document.toObject(StoryChapter.class);
        return chapter;
    }

    public String deleteChapter(String docID) throws InterruptedException, ExecutionException {

        ApiFuture<QuerySnapshot> future_character = this.firestore.collection(CHARACTER_TABLE_NAME).whereEqualTo("chapterID", docID).get();
        ApiFuture<QuerySnapshot> future_event = this.firestore.collection(EVENT_TABLE_NAME).whereEqualTo("chapterID", docID).get();

        List<QueryDocumentSnapshot> documentsCharacters = future_character.get().getDocuments();
        for (DocumentSnapshot document : documentsCharacters) {
            this.firestore.collection(CHARACTER_TABLE_NAME).document(document.getId()).delete();
        }
        List<QueryDocumentSnapshot> documentsEvents = future_event.get().getDocuments();
        for (DocumentSnapshot document : documentsEvents) {
            this.firestore.collection(EVENT_TABLE_NAME).document(document.getId()).delete();
        }

        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        try {
            future.get();
            return "Chapter successfully deleted!";
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;  
    }
    
}
