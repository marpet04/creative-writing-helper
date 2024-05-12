package hu.szte.msc.repositories;

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

import hu.szte.msc.entities.User;

@Service
public class UserRepository {
    private static final String USER_TABLE_NAME = "users";

    private final Firestore firestore;
    private CollectionReference COLL_REF;

    @Autowired
    public UserRepository(Firestore firestore) {
        this.firestore = firestore;
        this.COLL_REF = this.firestore.collection(USER_TABLE_NAME);
    }

    public User saveUser(User user) {
        String docId = COLL_REF.document().getId();
        user.setId(docId);
        ApiFuture<WriteResult> future = COLL_REF.document(docId).set(user);
        return user;
    }

    public User getUserByEmail(String email) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> future = COLL_REF.whereEqualTo("email", email).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        User user = documents.get(0).toObject(User.class);
        return user;
    }

    public User updateUser(User user) {
        ApiFuture<WriteResult> future = COLL_REF.document(user.getId()).set(user);
        return user;
    }
}
