import { useNavigate } from "react-router-dom";
import './Dashboard.css'


const Dashboard = ({ children }) => {
  const history = useNavigate();
  return (

    <div className='dashboard'>
      <div className='side-bar'>
        <h4>
          <p className="you"> <i className="fab fa-youtube"></i>   YouTube</p><br></br>
          <i className="fa-solid fa-house"></i>
          <button onClick={() => history("/home")} id="dash">Home</button><br></br>
        </h4>
        <hr className="hr"></hr>
        <div className="mute">
          <i className="fa-solid fa-film"></i>
          <button id="his" onClick={(e) => history("/movies")}>Movies</button><br></br>
          <i className="fas fa-newspaper"></i>
          <button id="like" onClick={(e) => history("/news")}>News</button><br></br>
          <hr></hr>
        </div>
        <i className="fas fa-fire"></i>
        <button id="trend" onClick={(e) => history("/trend")}>Trending</button><br></br>
        <hr ></hr>
        <i class="fas fa-flag"></i>
        <button id="help" onClick={(e) => history("/help")}>Help</button><br></br>
        <i className="far fa-comment"></i>
        <button id="send" onClick={(e) => history("/feedback")}>Send FeedBack</button><br></br>
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








