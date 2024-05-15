package hu.szte.msc.services;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.szte.msc.entities.User;
import hu.szte.msc.repositories.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.saveUser(user);
    }

    public User updateUser(User user) {
        return userRepository.updateUser(user);
    }

    public User getUserByEmail(String email) {
        try {
            return userRepository.getUserByEmail(email);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
