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

  useEffect(() => { fetchMovieVideos(); }, []);

  const fetchMovieVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/movies`);
      setMovieVideos(response.data.movieVideos);
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

  const displayVideos = searchQuery && searchResults.length > 0 ? searchResults : movieVideos;

  const VideoCard = ({ video }) => (
    <div className="movies-card">
      <div className="movies-video-wrapper">
        <iframe
          width="100%" height="195px"
          src={video.videoUrl}
          title={video.title || 'Movie Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="movies-video-overlay"><i className="fas fa-play"></i> Watch</div>
      </div>
      <div className="movies-info">
        <span className="movies-badge"><i className="fa-solid fa-film"></i> Movie</span>
        <h3 className="movies-title">{video.title || 'Untitled Movie'}</h3>
        <p className="movies-description">{video.desc || 'No description available'}</p>
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
            <Link to="/upload" className="nav-link">Upload Video</Link>
            <Link to="/help" className="nav-link">Help</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
          </div>
          <div className="navbar-right">
            <div className="search-container">
              <input
                type="text" className="search-bar" placeholder="Search movies..."
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

      <div className="movies-container">
        <div className="movies-page-header">
          <div className="movies-page-header-left">
            <div className="movies-header-icon"><i className="fa-solid fa-film"></i></div>
            <div>
              <h2>Movies</h2>
              <p>Discover the best movies and trailers</p>
            </div>
          </div>
          {displayVideos.length > 0 && (
            <span className="movies-count-badge">{displayVideos.length} Videos</span>
          )}
        </div>
        <div className="movies-divider"></div>

        <div className="movies-grid">
          {displayVideos.length > 0 ? (
            displayVideos.map((video) => (
              <VideoCard key={video._id || video.id} video={video} />
            ))
          ) : (
            <div className="no-videos">
              <i className="fa-solid fa-film"></i>
              <span>No movies found</span>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Movies;
