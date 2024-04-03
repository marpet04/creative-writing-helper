package hu.szte.msc.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import hu.szte.msc.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UserService userService;

    @PostMapping("/login")
    public boolean login(@RequestHeader String email, @RequestHeader String password) {
        try {
            UserRecord loginUser = userService.getUserByEmail(email);
            String customToken = FirebaseAuth.getInstance().createCustomToken(loginUser.getUid());
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return true;
    }

    @PostMapping("/registration")
    public boolean registration(@RequestHeader String username, @RequestHeader String password) {
        return true;
    }
    
}
