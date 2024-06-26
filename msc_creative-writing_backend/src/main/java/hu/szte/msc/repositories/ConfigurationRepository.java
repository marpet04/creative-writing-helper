package hu.szte.msc.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import hu.szte.msc.entities.CharacterPosition;
import hu.szte.msc.entities.Color;
import hu.szte.msc.entities.Line;

@Service
public class ConfigurationRepository {

    private static final String CONFIG_TABLE_NAME = "configuration";

    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public ConfigurationRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(CONFIG_TABLE_NAME);
    }

    public Line createLine(Line line) {
        String docId = COLL_REF.document().getId();
        line.setDocID(docId);
        line.setType("LINE");
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(line);
        return line;
    }

    public List<Line> getAllLines(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("type", "LINE").whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Line> listOfLines = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfLines.add(document.toObject(Line.class));
        }
        return listOfLines;
    }

    public Line updateLine(Line line) {
        ApiFuture<WriteResult> future = COLL_REF.document(line.getDocID()).set(line);
        return line;
    }

    public CharacterPosition createCharacterPosition(CharacterPosition cpos) {
        String docId = COLL_REF.document().getId();
        cpos.setDocID(docId);
        cpos.setType("POS");
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(cpos);
        return cpos;
    }

    public List<CharacterPosition> getAllCharacterPositions(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("type", "POS").whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<CharacterPosition> listOfCharacterPositions = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfCharacterPositions.add(document.toObject(CharacterPosition.class));
        }
        return listOfCharacterPositions;
    }

    public CharacterPosition updateCharPos(CharacterPosition charPos) {
        charPos.setType("POS");
        ApiFuture<WriteResult> future = COLL_REF.document(charPos.getDocID()).set(charPos);
        return charPos;
    }

    public String removeLine(String docID) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        future.get();
        return "A Vonal sikeresen törölve";
    }

    public Color createColor(Color color) {
        String docId = COLL_REF.document().getId();
        color.setDocID(docId);
        color.setType("COL");
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(color);
        return color;
    }

    public List<Color> getAllColors(String storyID) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("type", "COL").whereEqualTo("storyID", storyID).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Color> listOfColors = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            listOfColors.add(document.toObject(Color.class));
        }
        return listOfColors;
    }

    public Color updateColor(Color color) {
        color.setType("COL");
        ApiFuture<WriteResult> future = COLL_REF.document(color.getDocID()).set(color);
        return color;
    }

    public String removeColor(String docID) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> future = COLL_REF.document(docID).delete();
        future.get();
        return "Szín sikeresen törölve!"; 
    }

    
}
