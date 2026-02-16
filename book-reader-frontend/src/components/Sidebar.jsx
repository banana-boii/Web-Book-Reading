import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      
      {/* Section 1: Library Filters */}
      <div className="sidebar-section">
        <h3>Library</h3>
        <ul>
          <li><a href="#" className="active">All Books</a></li>
          <li><a href="#">Favorites</a></li>
          <li><a href="#">To Read</a></li>
          <li><a href="#">Finished</a></li>
        </ul>
      </div>

      {/* Section 2: Genres */}
      <div className="sidebar-section">
        <h3>Genres</h3>
        <ul>
          <li><a href="#">Fiction</a></li>
          <li><a href="#">Technology</a></li>
          <li><a href="#">Science</a></li>
          <li><a href="#">History</a></li>
        </ul>
      </div>

      {/* Section 3: Tags (Pills style) */}
      <div className="sidebar-section">
        <h3>Tags</h3>
        <div className="tag-cloud">
           <span className="tag">AI</span>
           <span className="tag">Java</span>
           <span className="tag">React</span>
           <span className="tag">Spring Boot</span>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;