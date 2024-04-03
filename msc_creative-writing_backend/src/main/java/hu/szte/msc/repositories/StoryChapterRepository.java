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

import hu.szte.msc.entities.StoryChapter;

@Service
public class StoryChapterRepository {

    private static final String CHAPTER_TABLE_NAME = "chapters";
    private Firestore db = FirestoreClient.getFirestore();
    private CollectionReference COLL_REF = db.collection(CHAPTER_TABLE_NAME);
    

    public StoryChapter createChapter(StoryChapter chapter) {
        String docId = COLL_REF.document().getId();
        chapter.setDocID(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(chapter);
        return chapter;
    }

    public List<StoryChapter> getAllChapters() throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<StoryChapter> listOfChapters = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfChapters.add(document.toObject(StoryChapter.class));
        }
        return listOfChapters;
    }
    
}
