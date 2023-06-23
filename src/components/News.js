import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App'
import './News.css';
import Dashboard from './Dashboard';

const News = () => {
  const [newsVideos, setNewsVideos] = useState([]);

  useEffect(() => {
    fetchNewsVideos();
  }, []);

  const fetchNewsVideos = async () => {
    try {
      const response = await axios.get(`${url}/video/news`);
      setNewsVideos(response.data.newsVideos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dashboard>
      <div>
        <h1 className='like'>News Videos</h1>
        {newsVideos.length > 0 ? (
          newsVideos.map((video) => (
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

export default News;
