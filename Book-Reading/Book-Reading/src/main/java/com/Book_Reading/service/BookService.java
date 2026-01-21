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

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book saveBook(String title, String author, MultipartFile file) throws IOException {
        //create upload directory if not exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        
        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        //generate unique filename
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        //define destination path
        Path filePath = uploadPath.resolve(filename);
        //save the file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        //save to databvase
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setFilePath(filePath.toString());
        book.setFormat(getFileExtension(filename));
        return bookRepository.save(book);
    }

    private String getFileExtension(String filename){
        if (filename == null || filename.lastIndexOf(".")==-1){
            return "unknown";
        }
        return filename.substring(filename.lastIndexOf(".")+1).toUpperCase();
    }
}
