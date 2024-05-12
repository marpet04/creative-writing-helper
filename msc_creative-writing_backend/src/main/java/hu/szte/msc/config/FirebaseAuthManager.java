package hu.szte.msc.config;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.client.HttpClient;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class FirebaseAuthManager {
    private static final String BASE_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
    private static final String OPERATION_AUTH = "verifyPassword";

    private final String firebaseKey;

    private static FirebaseAuthManager instance = null;

    protected FirebaseAuthManager() {
        firebaseKey = "MY_KEY";
    }

    public static FirebaseAuthManager getInstance() {
        if (instance == null) {
            instance = new FirebaseAuthManager();
        }
        return instance;
    }

    /**
     * Exchange an email and password with the Firebase Auth REST API for an ID token.
     * @param username A username or email registered with Firebase Authentication.
     * @param password The password associated with the username or email.
     * @return An ID token from Firebase.
     * @throws FirebaseAuthException
     */
    public String auth(String username, String password) throws FirebaseAuthException {
        String token;
        try {
            HttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost(BASE_URL + OPERATION_AUTH + "?key=" + firebaseKey);
            List<NameValuePair> params = new ArrayList<NameValuePair>(1);
            params.add(new BasicNameValuePair("email", username));
            params.add(new BasicNameValuePair("password", password));
            params.add(new BasicNameValuePair("returnSecureToken", "true"));
            httppost.setEntity(new UrlEncodedFormEntity(params, StandardCharsets.UTF_8));
            HttpEntity entity = httpclient.execute(httppost).getEntity();

            JsonParser jp = new JsonParser();
            JsonElement root = jp.parse(new InputStreamReader(entity.getContent()));
            JsonObject rootObj = root.getAsJsonObject();

            if (rootObj.get("error") != null) {
                //throw new FirebaseAuthException(rootObj.get("error").getAsJsonObject().get("message").getAsString());
            }
            token = rootObj.get("idToken").getAsString();
        } catch (IOException e) { System.out.println(e.getMessage()); return null; }
        return token;
    }
}
