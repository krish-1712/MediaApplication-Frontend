import './Dashboard.css';
import { Link } from 'react-router-dom';


const Dashboard = ({ children }) => {
  return (

    <div className="dashboard">
      <div className="side-bar">
        <h4>
          <p className="you">
            <i className="fab fa-youtube"></i> YouTube
          </p>
        </h4>
        <div className="nav-links">
          <Link to="/home" className="nav-link">
            <i className="fa-solid fa-house"></i> Home
          </Link><br></br>
          <Link to="/movies" className="nav-link">
            <i className="fa-solid fa-film"></i> Movies
          </Link><br></br>
          <Link to="/news" className="nav-link">
            <i className="fas fa-newspaper"></i> News
          </Link><br></br>
          <Link to="/trend" className="nav-link">
            <i className="fas fa-fire"></i> Trending
          </Link><br></br>
          <Link to="/help" className="nav-link">
            <i className="fas fa-flag"></i> Help
          </Link><br></br>
          <Link to="/feedback" className="nav-link">
            <i className="far fa-comment"></i> Feedback
          </Link>

        </div>
        <div className="footer-links">
          <p id="about">
            About | Press | Copyright | Contact us | Creators | Advertise | Developers | Terms | Privacy | Policy & Safety
          </p>
        </div>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>

  );
};

export default Dashboard;
