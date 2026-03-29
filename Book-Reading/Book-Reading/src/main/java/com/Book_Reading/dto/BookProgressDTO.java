package com.Book_Reading.dto;

import com.Book_Reading.model.Book;

public class BookProgressDTO {
    private Book book;
    private Integer currentPage;

    public BookProgressDTO(Book book, Integer currentPage) {
        this.book = book;
        this.currentPage = currentPage;
    }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }
    public Integer getCurrentPage() { return currentPage; }
    public void setCurrentPage(Integer currentPage) { this.currentPage = currentPage; }
}