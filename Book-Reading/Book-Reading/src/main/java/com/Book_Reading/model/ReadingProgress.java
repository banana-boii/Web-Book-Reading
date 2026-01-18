package com.Book_Reading.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.Book_Reading.model.User;
import com.Book_Reading.model.Book;

@Entity
@Table(
    name = "reading_progress",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "book_id"})
    }
)

public class ReadingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private Integer currentPage;

    private LocalDateTime lastReadAt;

    //constructors

    public ReadingProgress(){}

    public ReadingProgress(User user, Book book, Integer currentPage){
        this.user = user;
        this.book = book;
        this.currentPage = currentPage;
        this.lastReadAt = LocalDateTime.now();
    }

    //getters and setters

    public Long getId(){
        return id;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public Book getBook(){
        return book;
    }

    public void setBook(Book book){
        this.book = book;
    }

    public Integer getCurrentPage(){
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage){
        this.currentPage = currentPage;
    }

    public LocalDateTime getLastReadAt(){
        return lastReadAt;
    }

    public void setLastReadAt(LocalDateTime lastReadAt){
        this.lastReadAt = lastReadAt;
    }

    public void updateTimestamp(){
        this.lastReadAt = LocalDateTime.now();
    }
}
