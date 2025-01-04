import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import './Movies.css';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movieVideos, setMovieVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchMovieVideos();
  }, []);

  const fetchMovieVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/movies`);
      setMovieVideos(response.data.movieVideos);
    } catch (error) {
      console.log(error);
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

      <div className="movies-container">
        <div className="movies-grid">
          {searchQuery && searchResults.length > 0 ? (
            searchResults.map((video) => (
              <div key={video.id} className="movies-card">
                <iframe
                  width="100%"
                  height="200px"
                  src={video.videoUrl}
                  title={video.title || "movies Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <div className="movies-info">
                  <h3 className="movies-title">{video.title || "Untitled Video"}</h3>
                  <p className="movies-description">
                    {video.desc || "No description available"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            movieVideos.length > 0 ? (
              movieVideos.map((video) => (
                <div key={video._id} className="movies-card">
                  <iframe
                    width="100%"
                    height="200px"
                    src={video.videoUrl}
                    title={video.title || "movies Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <div className="movies-info">
                    <h3 className="movies-title">{video.title || "Untitled News"}</h3>
                    <p className="movies-description">
                      {video.desc || "No description available"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-videos">No videos found</p>
            )
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Movies;










