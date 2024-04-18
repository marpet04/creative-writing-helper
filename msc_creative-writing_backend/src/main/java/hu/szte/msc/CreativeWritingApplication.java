package hu.szte.msc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;

@SpringBootApplication
public class CreativeWritingApplication {

	public static void main(String[] args) {
		ClassLoader classLoader = CreativeWritingApplication.class.getClassLoader();

		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());

		try {
			FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.setStorageBucket("creative-writing-4c4b4.appspot.com")
				.build();

			FirebaseApp.initializeApp(options);
			//initializeStorage(serviceAccount);

			//Bucket bucket = StorageClient.getInstance().bucket();
				
        } catch (IOException e) {
            System.out.println("Error: " + e);
        }

		SpringApplication.run(CreativeWritingApplication.class, args);
	}

	/*public static Storage initializeStorage(FileInputStream serviceAccount) throws IOException {
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();

        return storage;
    }*/

}
