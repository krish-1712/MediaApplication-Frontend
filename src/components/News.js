import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import './News.css';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsVideos, setNewsVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();

  useEffect(() => { fetchNewsVideos(); }, []);

  const fetchNewsVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/news`);
      setNewsVideos(response.data.newsVideos);
    } catch (error) { console.log(error); }
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

  const displayVideos = searchQuery && searchResults.length > 0 ? searchResults : newsVideos;

  const VideoCard = ({ video, id }) => (
    <div key={id} className="news-card">
      <div className="news-video-wrapper">
        <iframe
          width="100%" height="195px"
          src={video.videoUrl}
          title={video.title || 'News Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="video-overlay"><i className="fas fa-play"></i> Watch</div>
      </div>
      <div className="news-info">
        <span className="news-badge"><i className="fas fa-newspaper"></i> News</span>
        <h3 className="news-title">{video.title || 'Untitled News'}</h3>
        <p className="news-description">{video.desc || 'No description available'}</p>
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
                type="text" className="search-bar" placeholder="Search videos..."
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

      <div className="news-container">
        <div className="news-page-header">
          <div className="news-page-header-left">
            <div className="news-header-icon"><i className="fas fa-newspaper"></i></div>
            <div>
              <h2>Latest News</h2>
              <p>Stay updated with the latest news videos</p>
            </div>
          </div>
          {displayVideos.length > 0 && (
            <span className="news-count-badge">{displayVideos.length} Videos</span>
          )}
        </div>
        <div className="news-divider"></div>

        <div className="news-grid">
          {displayVideos.length > 0 ? (
            displayVideos.map((video) => (
              <VideoCard key={video._id || video.id} id={video._id || video.id} video={video} />
            ))
          ) : (
            <div className="no-news">
              <i className="fas fa-newspaper"></i>
              <span>No news videos found</span>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default News;
