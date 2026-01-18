package com.Book_Reading.repository;

import com.Book_Reading.model.Book;
import com.Book_Reading.model.ReadingProgress;
import com.Book_Reading.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ReadingProgressRepository extends JpaRepository<ReadingProgress, Long> {

    Optional<ReadingProgress> findByUserAndBook(User user, Book book);
    
    List<ReadingProgress> findByUserOrderByLastReadAtDesc(User user);

    void deleteByBook(Book book);

}
