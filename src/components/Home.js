import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { url } from '../App';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetchHomeVideos();
  }, []);
  const fetchHomeVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/video/all`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching seen videos:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/video/search?q=${searchQuery}`);
      const searchResults = response.data;
      const searchedVideo = searchResults.find(
        (video) => video.title.toLowerCase() === searchQuery.toLowerCase()
      );

      if (searchedVideo) {
        const filteredResults = searchResults.filter(
          (video) => video.title.toLowerCase() !== searchQuery.toLowerCase()
        );
        setSearchResults([searchedVideo, ...filteredResults]);
      } else {
        setSearchResults(searchResults);
      }
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/');
  };

  return (
    <Dashboard>
      <div className="top-bar">
        <div className="navbar">
          <div className="logo">
            <i className="fab fa-netflix"></i>
          </div>
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
                type="text"
                className="search-bar"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button
                className="search-icon-button"
                onClick={handleSearch}
                aria-label="Search"
              >
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
      <div className="grid-containers">
        {(searchResults.length > 0 ? searchResults : videos).map((video, index) => (
          <div key={video.id || index} className="grid-item">
            <div className="grid-item-thumb">
              <iframe
                src={video.videoUrl}
                title={video.title || 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="grid-item-info">
              <div className="grid-item-channel">
                <i className="fas fa-user"></i>
              </div>
              <div className="grid-item-meta">
                <span className="grid-item-title">{video.title || 'Untitled Video'}</span>
                <span className="grid-item-sub">StreamHub</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Home;

