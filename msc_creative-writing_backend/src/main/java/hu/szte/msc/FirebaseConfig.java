package hu.szte.msc;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

@Configuration
public class FirebaseConfig {

	@Bean
    public FirebaseApp firebase() throws IOException {
		ClassLoader classLoader = FirebaseConfig.class.getClassLoader();

        URL url = classLoader.getResource("serviceAccountKey.json");
        if (url != null) {
            InputStream serviceAccount = url.openStream(); // Open the stream directly from the URL
        

        FirebaseOptions options = new FirebaseOptions.Builder()
               .setCredentials(GoogleCredentials.fromStream(serviceAccount))
			   .setStorageBucket("creative-writing-4c4b4.appspot.com")
               .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        }
		
        return FirebaseApp.getInstance();
    }

    @Bean
    public Firestore firestore() {
        return FirestoreClient.getFirestore();
    }

    @Bean
    public FirebaseAuth firebaseAuth() {
        try {
            return FirebaseAuth.getInstance(firebase());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return FirebaseAuth.getInstance();
    }

}
