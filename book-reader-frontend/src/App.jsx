import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import MyBooks from "./pages/MyBooks";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import ReadBook from "./pages/ReadBook";
import './App.css';

function MainLayout({ user, setUser }) {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      
      {/*navbar hidden for login page*/}
      {!isAuthPage && <Navbar user={user} setUser={setUser} />}

      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Browse user={user} />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/notes" element={<Notes />} />
          {/*<Route path="/read/:id" element={<ReadBook />} />*/}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      {/* We moved the layout logic into MainLayout */}
      <MainLayout user={user} setUser={setUser} />
    </Router>
  );
}

export default App;