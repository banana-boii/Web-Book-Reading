import { useState, useRef, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null);                   
    setIsDropdownOpen(false);        
    navigate("/");                   
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    navigate("/login");
  };

  //get display name
  const displayName = user ? user.username : "Guest";

  // Generate avatar using ui-avatars.com
  const avatarUrl = `https://ui-avatars.com/api/?name=${displayName}&background=2c3e50&color=fff&bold=true`;
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 BookReader</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-item">Browse</Link>
        
        {user && (
          <>
            <Link to="/my-books" className="nav-item">My Books</Link>
            <Link to="/notes" className="nav-item">Notes</Link>
          </>
        )}
      </div>

      <div className="navbar-user" ref={dropdownRef} style={{ position: "relative" }}>
        
        <div 
          className="profile-avatar-container" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img src={avatarUrl} alt="Profile" className="profile-avatar" />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <p className="dropdown-username">{displayName}</p>
            
            {user ? (
              <button onClick={handleLogout} className="dropdown-btn logout-btn">
                Log Out
              </button>
            ) : (
              <button onClick={handleLogin} className="dropdown-btn login-btn">
                Log In
              </button>
            )}
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;