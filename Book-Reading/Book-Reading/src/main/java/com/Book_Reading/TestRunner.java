package com.Book_Reading;

import com.Book_Reading.model.User;
import com.Book_Reading.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TestRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("----Starting database test----");

        //create a test user
        User testUser = new User("test-user", "some-password");

        //test if the user already exits
        if (userRepository.findByUsername("test-user").isEmpty()){

            //save the user to the database
            userRepository.save(testUser);
            System.out.println("User 'test-user' added to the database.");
        } else {
            System.out.println("User 'test-user' already exists in the database.");
        }

        //retiriev the user from the database
        User retrievedUser = userRepository.findByUsername("test-user").get();
        System.out.println("Found user ID: " + retrievedUser.getId());

        System.out.println("----Test completed----");
    }

}
