import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";

const Browse = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    return (
      <div style={{ display: 'flex', maxWidth: '100%', margin: '0 auto' }}>

      <Sidebar />
      <div style={{ flex: 1,padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>My Book Library</h1>
        
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="book-grid">
            {books.map(book => (
              <div key={book.id} className="book-card">
                
                <img 
                  src={`http://localhost:8080/uploads/${book.coverPagePath}`} 
                  alt={book.title} 
                  className="book-cover" 
                />

                <div className="hover-overlay">
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {Math.round((book.currentPage / book.totalPages) * 100)}%
                    </span>
                    <p>Completed</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Browse;