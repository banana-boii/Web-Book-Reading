package com.Book_Reading.controller;

import com.Book_Reading.model.Book;
import com.Book_Reading.service.BookService;
import com.Book_Reading.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController //handles HTTP requests
@RequestMapping("/api/books")  //base URL
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private PdfService pdfService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
            }
        
            // The service handles everything now!
            Book savedBook = bookService.saveBook(title, author, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading the book: " + e.getMessage());
        }
    }
}
