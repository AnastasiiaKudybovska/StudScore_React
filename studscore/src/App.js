import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/Login/LoginForm';
import { BrowserRouter as Router, Route, Routes,  useParams, useNavigate, useLocation } from 'react-router-dom';
import './App.scss';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Contacts from './components/Contacts';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';


function App() {
  const [token, setToken] = useState();
  const location = useLocation(); 
  const {pathname} = location; 

  return (
    <div className="App">
      {(pathname === 'StudScore/statistics' || pathname === 'StudScore/profile' || pathname ==='StudScore/contacts') ? <Navbar/> : null}
        <Routes>
          <Route path="StudScore/" element={<LoginForm setToken={setToken} />} />
          <Route path="StudScore/statistics" element={<Statistics/>} />
          <Route path="StudScore/profile" element={<Profile/>} />
          <Route path="StudScore/contacts" element={<Contacts/>} />
        </Routes>
        {(pathname === '/statistics' || pathname === '/profile' || pathname ==='/contacts') ? <Footer/> : null}
    </div>
  );
}

export default App;