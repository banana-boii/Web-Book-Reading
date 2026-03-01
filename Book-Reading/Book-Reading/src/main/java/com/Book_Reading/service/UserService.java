package com.Book_Reading.service;

import com.Book_Reading.model.User;
import com.Book_Reading.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //registration
    public User registerUser(String username, String rawPassword) throws Exception {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new Exception("Username is already taken.");
        }

        String hashedPassword = BCrypt.hashpw(rawPassword, BCrypt.gensalt());

        User newUser = new User(username, hashedPassword);
        return userRepository.save(newUser);
    }

    //login
    public User authenticateUser(String username, String rawPassword) throws Exception {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        
        if (optionalUser.isEmpty()) {
            throw new Exception("User not found.");
        }

        User user = optionalUser.get();

        if (BCrypt.checkpw(rawPassword, user.getPasswordHash())) {
            return user; // Passwords match! Return the user profile.
        } else {
            throw new Exception("Invalid password.");
        }
    }
}