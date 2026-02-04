package com.Book_Reading.service;

import com.Book_Reading.model.Book;
import com.Book_Reading.repository.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service //holds business logic
public class BookService {

    //gives path to project directory and uploads 
    private final String UPLOAD_DIR = System.getProperty("user.dir")+"/uploads";

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PdfService pdfService;

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book saveBook(String title, String author, MultipartFile file) throws IOException {
        //create upload directory if not exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        
        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        // 1. Generate filenames for BOTH the PDF and the Cover Image
        String uniqueId = UUID.randomUUID().toString();
        String pdfFilename = uniqueId + "_" + file.getOriginalFilename();
        String imageFilename = uniqueId + "_cover.png"; // E.g., 1234_cover.png

        // 2. Save the PDF to the uploads folder
        Path pdfFilePath = uploadPath.resolve(pdfFilename);
        Files.copy(file.getInputStream(), pdfFilePath, StandardCopyOption.REPLACE_EXISTING);

        // 3. Define where the image should go, and let PdfService create it
        Path imageFilePath = uploadPath.resolve(imageFilename);
        int totalPages = pdfService.generateCoverAndCountPages(pdfFilePath.toFile(), imageFilePath.toString());

        // 4. Save to database using your exact column names
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setFilePath(pdfFilename); // Store just the filename, not full PC path
        book.setFormat(getFileExtension(pdfFilename));
        
        // ADDED FIELDS:
        book.setTotalPages(totalPages);
        book.setCoverPagePath(imageFilename); // Saves "1234_cover.png" to DB

        return bookRepository.save(book);
    }

    private String getFileExtension(String filename){
        if (filename == null || filename.lastIndexOf(".")==-1){
            return "unknown";
        }
        return filename.substring(filename.lastIndexOf(".")+1).toUpperCase();
    }
}
