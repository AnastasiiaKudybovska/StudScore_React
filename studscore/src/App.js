import React, { useEffect, useState } from 'react'
import LoginForm from './components/Login/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Contacts from './components/Contacts';


function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm setToken={setToken} />} />
            <Route path="/statistics" element={<Statistics/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/contacts" element={<Contacts/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
