import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { url } from '../App';
import './Trend.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Trend = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();

  useEffect(() => { fetchTrendingVideos(); }, []);

  const fetchTrendingVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/trend`);
      setVideos(response.data);
    } catch (error) { console.error('Error fetching trending videos:', error); }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/video/search?q=${searchQuery}`);
      const results = response.data;
      const exact = results.find(v => v.title.toLowerCase() === searchQuery.toLowerCase());
      setSearchResults(exact ? [exact, ...results.filter(v => v !== exact)] : results);
    } catch (error) { console.error('Error searching videos:', error); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/');
  };

  const displayVideos = searchQuery && searchResults.length > 0 ? searchResults : videos;

  const VideoCard = ({ video, index }) => (
    <div className="trend-card">
      <span className={`trend-rank ${index < 3 ? 'top3' : ''}`}>{index + 1}</span>
      <div className="trend-video-wrapper">
        <iframe
          width="100%" height="195px"
          src={video.videoUrl}
          title={video.title || 'Trending Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="trend-video-overlay"><i className="fas fa-play"></i> Watch</div>
      </div>
      <div className="trend-info">
        <span className="trend-badge"><i className="fas fa-fire"></i> Trending</span>
        <h3 className="trend-title">{video.title || 'Untitled Video'}</h3>
        <p className="trend-description">{video.desc || 'No description available'}</p>
      </div>
    </div>
  );

  return (
    <Dashboard>
      <div className="top-bar">
        <div className="navbar">
          <div className="logo"><i className="fab fa-netflix"></i></div>
          <div className="nav-links-container">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/trend" className="nav-link">Trending</Link>
            <Link to="/help" className="nav-link">Help</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
          </div>
          <div className="navbar-right">
            <div className="search-container">
              <input
                type="text" className="search-bar" placeholder="Search trending..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-icon-button" onClick={handleSearch} aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="profile-container">
              <div className="profile-icon" onClick={handleLogout}>
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trend-container">
        <div className="trend-page-header">
          <div className="trend-page-header-left">
            <div className="trend-header-icon"><i className="fas fa-fire"></i></div>
            <div>
              <h2>Trending Now</h2>
              <p>What the world is watching right now</p>
            </div>
          </div>
          {displayVideos.length > 0 && (
            <span className="trend-count-badge">{displayVideos.length} Videos</span>
          )}
        </div>
        <div className="trend-divider"></div>

        <div className="trend-grid">
          {displayVideos.length > 0 ? (
            displayVideos.map((video, index) => (
              <VideoCard key={video._id || video.id} video={video} index={index} />
            ))
          ) : (
            <div className="no-videos">
              <i className="fas fa-fire"></i>
              <span>No trending videos found</span>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Trend;
