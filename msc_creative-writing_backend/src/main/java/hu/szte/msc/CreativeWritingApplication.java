package hu.szte.msc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.core.io.ClassPathResource;


@SpringBootApplication
public class CreativeWritingApplication {

	public static void main(String[] args) {
		/*ClassLoader classLoader = CreativeWritingApplication.class.getClassLoader();

		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());

		try {
			System.out.println(file.getAbsolutePath());
			FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.setStorageBucket("creative-writing-4c4b4.appspot.com")
				.build();

			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp app = FirebaseApp.initializeApp(options);
				System.out.println(app.getName());
			}
				
        } catch (IOException e) {
            System.out.println("Error: " + e);
        }*/

		//AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(FirebaseConfig.class);
		//FirebaseConfig config = context.getBean(FirebaseConfig.class);

		SpringApplication.run(CreativeWritingApplication.class, args);
	}

}
