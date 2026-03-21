import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ReadBook = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  // Fetch book's details 
  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch book details.");
        return res.json();
      })
      .then(data => setBook(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}><h2>Error: {error}</h2></div>;
  }

  if (!book) {
    return <div style={{ padding: '40px', textAlign: 'center' }}><h2>Loading your book...</h2></div>;
  }

  const pdfUrl = `http://localhost:8080/uploads/${book.filePath}`;

  console.log("Looking for PDF at:", pdfUrl);
  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Reading Toolbar */}
      <div style={{ 
        padding: '10px 20px', 
        backgroundColor: '#2c3e50', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            ← Back
          </Link>
          <h3 style={{ margin: 0 }}>{book.title}</h3>
        </div>
        <span style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>By {book.author}</span>
      </div>

      {/* Browser PDF Reader */}
      <div style={{ flexGrow: 1, backgroundColor: '#525659' }}>
        <iframe 
          src={`${pdfUrl}#toolbar=0`} 
          width="100%" 
          height="100%" 
          style={{ border: 'none' }}
          title={book.title}
        />
      </div>

    </div>
  );
};

export default ReadBook;