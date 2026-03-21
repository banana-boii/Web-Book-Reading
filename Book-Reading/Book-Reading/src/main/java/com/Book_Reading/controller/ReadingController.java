package com.Book_Reading.controller;

import com.Book_Reading.model.Book;
import com.Book_Reading.model.ReadingProgress;
import com.Book_Reading.model.User;
import com.Book_Reading.repository.BookRepository;
import com.Book_Reading.repository.ReadingProgressRepository;
import com.Book_Reading.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reading")
public class ReadingController {

    @Autowired
    private ReadingProgressRepository readingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    //Called when a user opens a book 
    @PostMapping("/start")
    public ResponseEntity<?> startReading(@RequestBody Map<String, Long> request) {
        try {
            Long userId = request.get("userId");
            Long bookId = request.get("bookId");

            User user = userRepository.findById(userId).orElseThrow();
            Book book = bookRepository.findById(bookId).orElseThrow();

            // Check if user already started reading this book
            Optional<ReadingProgress> existingProgress = readingRepository.findByUserAndBook(user, book);

            if (existingProgress.isPresent()) {
                // continue reading
                ReadingProgress progress = existingProgress.get();
                progress.updateTimestamp();
                readingRepository.save(progress);
            } else {
                //New book
                ReadingProgress newProgress = new ReadingProgress(user, book, 1);
                readingRepository.save(newProgress);
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating progress: " + e.getMessage());
        }
    }

    //fetches the user's books
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Book>> getMyBooks(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        
        //progress records
        List<ReadingProgress> progressList = readingRepository.findByUserOrderByLastReadAtDesc(user);
        
        // get book for frontend display
        List<Book> myBooks = progressList.stream()
                .map(ReadingProgress::getBook)
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(myBooks);
    }
}