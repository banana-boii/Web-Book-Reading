import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 BookReader</Link>
      </div>
      
      <div className="navbar-links">
        {/* The Browse Page (All books in DB) */}
        <Link to="/" className="nav-item">Browse</Link>
        
        {/* The User's Personal Library/History */}
        <Link to="/my-books" className="nav-item">My Books</Link>
        
        {/* The Notepad Feature */}
        <Link to="/notes" className="nav-item">Notes</Link>
      </div>

      <div className="navbar-user">
        {/* Placeholder for future Profile button */}
        <button className="profile-btn">👤</button>
      </div>
    </nav>
  );
};

export default Navbar;