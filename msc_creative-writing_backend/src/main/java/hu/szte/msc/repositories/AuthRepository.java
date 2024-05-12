package hu.szte.msc.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;

@Service
public class AuthRepository {

    private final FirebaseAuth auth;

    @Autowired
    public AuthRepository(FirebaseAuth auth) {
        this.auth = auth;
    }

    public String createUser(String email, String password) throws FirebaseAuthException {
        CreateRequest request = new CreateRequest()
            .setEmail(email)
            .setPassword(password);
        UserRecord user = auth.createUser(request);
        return createCustomToken(email);

    }

    private String createCustomToken(String email) throws FirebaseAuthException {
        UserRecord user = auth.getUserByEmail(email);
        return auth.createCustomToken(user.getUid());
    }

    private boolean verifyToken(String token) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String uid = decodedToken.getUid();
        try {
            UserRecord user = auth.getUser(uid);
        } catch (FirebaseAuthException e) {
            return false;
        }
        return true;
    }

}
