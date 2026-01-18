package com.Book_Reading.model;

import jakarta.persistence.*;

@Entity //maps to a database table
@Table(name = "users")
public class User {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //username must be unique
    @Column(nullable = false, unique = true)
    private String username;

    //hashed password storage
    @Column(nullable = false)
    private String passwordHash;

    // Constructores
    public User() {}

    public User(String username, String passwordHash){
        this.username = username;
        this.passwordHash = passwordHash;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
