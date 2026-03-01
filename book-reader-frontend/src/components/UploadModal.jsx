import { useState } from 'react';

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setIsUploading(true);
    setError('');

    //formdata since we upload a file not json
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5173/api/books/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onUploadSuccess(); // refresh the book list
        onClose();         // Close the popup
      } else {
        setError('Failed to upload book. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to the server.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ marginTop: 0 }}>Upload New Book</h2>
        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Book Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="Author" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={e => setFile(e.target.files[0])} 
            required 
            style={styles.input}
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={styles.cancelBtn} disabled={isUploading}>
              Cancel
            </button>
            <button type="submit" style={styles.uploadBtn} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(23, 23, 23, 0.7)', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: '#000000', padding: '30px', borderRadius: '8px',
    width: '400px', maxWidth: '90%', color: '#c9c9c9', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  input: {
    padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem'
  },
  cancelBtn: {
    padding: '10px 15px', border: 'none', backgroundColor: '#ff0000', color: '#ffffff', borderRadius: '4px', cursor: 'pointer'
  },
  uploadBtn: {
    padding: '10px 15px', border: 'none', backgroundColor: '#3498db', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
  }
};

export default UploadModal;