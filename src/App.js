
import './App.css';
import React,{useEffect} from 'react'
import CategoryPage from './components/CategoryPage';
import HomePage from "./components/HomePage";
import GameDetails from './components/GameDetails';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import Login from './components/Login';
import SubscriptionPage from './Pages/SubscriptionPage';
import OtpValidationPage from './Pages/OtpValidationPage';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

function App() {

  const CustomRedirect = ({ externalUrl }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const user = Cookies.get('user');
      if (!user || user == null || user == undefined || user == " ") {
        Cookies.set('user','subscribed');
        Cookies.set('new_user_without_login','no_login',{expires:1});
        window.location.href = externalUrl;
      } 
      else if(user == 'subscribed') {
        navigate('/home')
      }
    }, [navigate, externalUrl]);
  
    return null;
  };
  
  


  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<CustomRedirect externalUrl='http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D'/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/subscribe" element={<SubscriptionPage/>}/>
          <Route path="/otp-validation" element={<OtpValidationPage/>}/>
          <Route path="/games/:gameid" element={<GameDetails/>} />
          <Route path="/category/:categoryName" element={<CategoryPage/>} /> 
          <Route path="/search" element={<SearchBox/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  