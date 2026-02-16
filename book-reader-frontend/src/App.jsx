import { useState , useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import MyBooks from "./pages/MyBooks";
import Notes from "./pages/Notes";
import './App.css'

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
    .then(response => response.json())
    .then(data => setBooks(data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <Router>
      <div className="app-container">
        
        {/* The Navbar stays on top of every page */}
        <Navbar />

        {/* The Routes decide what shows up below the Navbar */}
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App
