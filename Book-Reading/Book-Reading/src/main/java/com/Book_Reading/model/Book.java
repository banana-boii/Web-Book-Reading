package com.Book_Reading.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    private Integer totalPages;  //can be null

    @Column(nullable = false)
    private String filePath;

    private String coverPagePath;  //can be null

    private String format; //pdf or epub

    //constructors
    public Book(){}

    public Book(String title, String author, Integer totalPages, String filePath, String coverPagePath, String format){
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.filePath = filePath;
        this.coverPagePath = coverPagePath;
        this.format = format;
    }

    //getters and setters

    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getAuthor(){
        return author;
    }

    public void setAuthor(String author){
        this.author = author;
    }

    public Integer getTotalPages(){
        return totalPages;
    }

    public void setTotalPages(Integer totalPages){
        this.totalPages = totalPages;
    }

    public String getFilePath(){
        return filePath;
    }

    public void setFilePath(String filePath){
        this.filePath = filePath;
    }

    public String getCoverPagePath(){
        return coverPagePath;
    }

    public void setCoverPagePath(String coverPagePath){
        this.coverPagePath = coverPagePath;
    }

    public String getFormat(){
        return format;
    }

    public void setFormat(String format){
        this.format = format;
    }

}
