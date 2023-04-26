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
  const location = useLocation(); // Доданий хук useHistory()
  const {pathname} = location; // Отримання поточного шляху з хука useHistory()

  return (
    <div className="App">
      {(pathname === '/statistics' || pathname === '/profile' || pathname ==='/contacts') ? <Navbar/> : null}
        <Routes>
          <Route path="/" element={<LoginForm setToken={setToken} />} />
          <Route path="/statistics" element={<Statistics/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/contacts" element={<Contacts/>} />
        </Routes>
        {(pathname === '/statistics' || pathname === '/profile' || pathname ==='/contacts') ? <Footer/> : null}
    </div>
  );
}

export default App;