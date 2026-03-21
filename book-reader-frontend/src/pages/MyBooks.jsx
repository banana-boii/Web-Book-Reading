import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyBooks = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // fetch user specific list of books
    if (user) {
      fetch(`http://localhost:8080/api/reading/user/${user.id}`)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching my books:', error));
    }
  }, [user]);

  // message for guest users
  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', height: '80vh' }}>
        <h2>Please log in to track your reading progress.</h2>
        <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1>Continue Reading</h1>
      
      {books.length === 0 ? (
        <p>You haven't started reading any books yet. Go to Browse to find one!</p>
      ) : (
        <div className="book-grid">
          {books.map(book => (
             <Link to={`/read/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="book-card">
                  <img 
                    src={`http://localhost:8080/uploads/${book.coverPagePath}`} 
                    alt={book.title} 
                    className="book-cover" 
                  />
                  <div className="hover-overlay">
                    <h3>{book.title}</h3>
                    <p>By {book.author}</p>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;