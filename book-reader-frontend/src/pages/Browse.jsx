import { useState, useEffect } from 'react';
import UploadModal from '../components/UploadModal';
import { Link } from 'react-router-dom';


const Browse = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = () => {
    fetch('http://localhost:8080/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  };

    useEffect(() => {
        fetch('http://localhost:8080/api/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);

  return (
    <div className="page-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>My Book Library</h1>
      
      {books.length === 0 ? (
        <p>No books found.</p>
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
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {Math.round((book.currentPage / book.totalPages) * 100) || 0}%
                      </span>
                      <p>Completed</p>
                    </div>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      )}

      {user && (
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#363636',
            color: 'white',
            border: 'none',
            fontSize: '32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.2s',
            zIndex: 100 
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          +
        </button>
      )}

      {isModalOpen && (
        <UploadModal 
          onClose={() => setIsModalOpen(false)} 
          onUploadSuccess={fetchBooks} 
        />
      )}

    </div>
  );
};
    
export default Browse;

// return (
//       <div style={{ display: 'flex', maxWidth: '100%', margin: '0 auto' }}>

//       <Sidebar />
//       <div style={{ flex: 1,padding: '20px', fontFamily: 'sans-serif' }}>
//         <h1>My Book Library</h1>
        
//         {books.length === 0 ? (
//           <p>No books found.</p>
//         ) : (
//           <div className="book-grid">
//             {books.map(book => (
//               <div key={book.id} className="book-card">
                
//                 <img 
//                   src={`http://localhost:8080/uploads/${book.coverPagePath}`} 
//                   alt={book.title} 
//                   className="book-cover" 
//                 />

//                 <div className="hover-overlay">
//                   <h3>{book.title}</h3>
//                   <p>By {book.author}</p>
//                   <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                     <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                       {Math.round((book.currentPage / book.totalPages) * 100)}%
//                     </span>
//                     <p>Completed</p>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };