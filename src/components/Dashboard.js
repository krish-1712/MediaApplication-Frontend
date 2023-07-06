import './Dashboard.css'
import { Link } from 'react-router-dom';

const Dashboard = ({ children }) => {
  return (

    <div className='dashboard'>
      <div className='side-bar'>
        <h4>
          <p className="you"> <i className="fab fa-youtube"></i>YouTube</p><br></br>
          <i className="fa-solid fa-house"></i>
          <Link to="/home" id="dash">Home</Link><br></br>
        </h4>
        <hr className="hr"></hr>
        <div className="mute">
          <i className="fa-solid fa-film"></i>   <Link to="/movies" id="his">Movies</Link><br></br>
          <i className="fas fa-newspaper"></i>
          <Link to="/news" id="like">News</Link><br></br>
          <hr></hr>
        </div>
        <i className="fas fa-fire"></i>
        <Link to="/trend" id="trend">Trending</Link><br></br>
        <hr ></hr>
        <i className="fas fa-flag"></i>

        <Link to="/help" id="help">Help</Link><br></br>
        <i className="far fa-comment"></i>
        <Link to="/feedback" id="send">Send Feedback</Link><br></br>
        <hr></hr>
        <p id="about">About Press Copyright<br></br>
          Contact us Creators<br></br>
          Advertise Developers<br></br>
          TermsPrivacyPolicy & Safety<br></br>
          How YouTube works<br></br>
          Test new features<br></br>
          © 2023 Google LLC</p>
      </div>
      <div className='main-content'>
        {children}
      </div>
    </div>
  )
}
export default Dashboard








