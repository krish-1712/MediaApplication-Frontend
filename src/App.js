
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Help from './components/Help';
import Feedback from './components/Feedback';
import Trend from './components/Trend';
import News from './components/News';
import Movies from './components/Movies';
import Forgot from './components/Forgot';
import Password from './components/Password';
export const url = "http://localhost:8000"
// export const url = "https://media-application-backend.onrender.com/"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/help' element={<Help />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/trend' element={<Trend />} />
          <Route path='/news' element={<News />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/password' element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
