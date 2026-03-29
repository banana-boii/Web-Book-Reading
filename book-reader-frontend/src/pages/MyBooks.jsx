import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyBooks = ({ user }) => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    // fetch user specific list of books
    if (user) {
      fetch(`http://localhost:8080/api/reading/user/${user.id}`)
        .then(response => response.json())
        .then(data => setReadingList(data))
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
      
      {readingList.length === 0 ? (
        <p>You haven't started reading any books yet. Go to Browse to find one!</p>
      ) : (
        <div className="book-grid">
          {readingList.map(item => {
            // Unpack the DTO
            const book = item.book;
            const currentPage = item.currentPage;
            
            // Calculate progress percentage if we know the total pages
            const percentage = book.totalPages ? Math.round((currentPage / book.totalPages) * 100) : null;

            return (
             <Link to={`/read/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="book-card">
                  <img 
                    src={`http://localhost:8080/uploads/${book.coverPagePath}`} 
                    alt={book.title} 
                    className="book-cover" 
                  />
                  <div className="hover-overlay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3>{book.title}</h3>
                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '8px' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Page {currentPage} {book.totalPages ? `of ${book.totalPages}` : ''}
                      </p>
                      
                      {/* Render the actual progress bar only if we have a percentage */}
                      {percentage !== null && (
                        <div style={{ width: '100%', backgroundColor: '#555', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${percentage}%`, backgroundColor: '#2ecc71', height: '100%' }}></div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
             </Link>
          )
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooks;