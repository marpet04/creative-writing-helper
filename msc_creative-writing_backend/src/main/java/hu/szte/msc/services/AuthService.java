package hu.szte.msc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuthException;

import hu.szte.msc.dtos.UserDTO;
import hu.szte.msc.repositories.AuthRepository;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public String register(UserDTO dto) {
        String token = "";
        try {
            token = authRepository.createUser(dto.email(), dto.password());
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return token;
    }
    
}
