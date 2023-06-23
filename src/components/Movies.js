import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import './Movies.css';
import Dashboard from './Dashboard';

const Movies = () => {
  const [movieVideos, setMovieVideos] = useState([]);

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
  return (
    <Dashboard>
      <div>
        <h1 className='like'>Movies Videos</h1>
        {movieVideos.length > 0 ? (
          movieVideos.map((video) => (
            <div key={video._id} className="grid-item">
              <iframe
                width="100%"
                height="100%"
                src={video.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </Dashboard>
  );
};

export default Movies;
