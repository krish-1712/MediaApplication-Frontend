import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { url } from '../App';
import './Trend.css';

const Trend = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const fetchTrendingVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/trend`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching trending videos:', error);
    }
  };

  return (
    <Dashboard>
      <div className="container">
        <h1 className='trend'>Trending Page</h1>
        <div>
          <div className="grid-container">
            {videos.map((video) => (
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
            ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Trend;
