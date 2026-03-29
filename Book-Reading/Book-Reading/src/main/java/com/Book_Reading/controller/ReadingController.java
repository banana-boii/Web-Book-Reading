package com.Book_Reading.controller;

import com.Book_Reading.model.Book;
import com.Book_Reading.model.ReadingProgress;
import com.Book_Reading.model.User;
import com.Book_Reading.repository.BookRepository;
import com.Book_Reading.repository.ReadingProgressRepository;
import com.Book_Reading.repository.UserRepository;
import com.Book_Reading.dto.BookProgressDTO;

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

    //fetches books of the user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookProgressDTO>> getMyBooks(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<ReadingProgress> progressList = readingRepository.findByUserOrderByLastReadAtDesc(user);
        
        // Map the data
        List<BookProgressDTO> myBooksWithProgress = progressList.stream()
                .map(p -> new BookProgressDTO(p.getBook(), p.getCurrentPage()))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(myBooksWithProgress);
    }

    //update page number
    @PutMapping("/update")
    public ResponseEntity<?> updateProgress(@RequestBody Map<String, Object> request) {
        try {
            // Extract values
            Long userId = Long.valueOf(request.get("userId").toString());
            Long bookId = Long.valueOf(request.get("bookId").toString());
            Integer currentPage = Integer.valueOf(request.get("currentPage").toString());

            User user = userRepository.findById(userId).orElseThrow();
            Book book = bookRepository.findById(bookId).orElseThrow();

            // Progress
            ReadingProgress progress = readingRepository.findByUserAndBook(user, book).orElseThrow(() -> new Exception("Progress record not found"));

            // Update
            progress.setCurrentPage(currentPage);
            progress.updateTimestamp();
            readingRepository.save(progress);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}