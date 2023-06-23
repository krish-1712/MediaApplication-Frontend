





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Dashboard from './Dashboard';
// import { url } from '../App';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';


// const Home = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);


//   let navigate = useNavigate();

//   useEffect(() => {
//     fetchHomeVideos();
//   }, []);

//   const fetchHomeVideos = async () => {
//     try {
//       const response = await axios.get(`${url}/video/video/all`);
//       console.log(response);
//       setVideos(response.data);
//     } catch (error) {
//       console.error('Error fetching seen videos:', error);
//     }
//   };

//   // const handleSearch = async () => {
//   //   try {
//   //     const response = await axios.get(`${url}/video/search?q=${searchQuery}`);
//   //     const searchResults = response.data;
//   //     setSearchResults(searchResults);
//   //   } catch (error) {
//   //     console.error('Error searching videos:', error);
//   //   }
//   // };
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`${url}/video/search?q=${searchQuery}`);
//       const searchResults = response.data;

//       // Check if the searched video exists in the search results
//       const searchedVideo = searchResults.find(
//         (video) => video.title.toLowerCase() === searchQuery.toLowerCase()
//       );

//       if (searchedVideo) {
//         // Remove the searched video from the search results
//         const filteredResults = searchResults.filter(
//           (video) => video.title.toLowerCase() !== searchQuery.toLowerCase()
//         );

//         // Set the search results with the searched video at the top
//         setSearchResults([searchedVideo, ...filteredResults]);
//       } else {
//         setSearchResults(searchResults);
//       }
//     } catch (error) {
//       console.error('Error searching videos:', error);
//     }
//   };  

//   return (
//     <Dashboard>
//       <div className="top-bar">
//         {/* <div className="search-bar">
//           <input type="text" placeholder="Search" />
//           <button onClick={()=>handleSearch()}>Search</button>
//         </div> */}
//          <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//         <button className="login-in-button" onClick={() => navigate('/login')}>
//           <i className="far fa-user-circle"></i>Login In
//         </button>
//         <button className="sign-in-button" onClick={() => navigate('/register')}>
//           <i className="fas fa-user-plus"></i> Sign Up
//         </button>
//       </div>
//       <div className="grid-container">
//         {videos.map((video) => (
//           <div key={video.id} className="grid-item">
//             <iframe
//               width="100%"
//               height="100%"
//               src={video.videoUrl}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>
//           </div>
//         ))}
//       </div>

//     </Dashboard>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { url } from '../App';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="login-out-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
        <button className="login-in-button" onClick={() => navigate('/')}>
          <i className="far fa-user-circle"></i>Login In
        </button>
        <button className="sign-in-button" onClick={() => navigate('/register')}>
          <i className="fas fa-user-plus"></i> Sign Up
        </button>
      </div>
      <div className="grid-container">
        {searchResults.length > 0 ? (
          searchResults.map((video) => (
            <div key={video.id} className="grid-item">
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
          videos.map((video) => (
            <div key={video.id} className="grid-item">
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
        )}
      </div>
    </Dashboard>
  );
};

export default Home;





















