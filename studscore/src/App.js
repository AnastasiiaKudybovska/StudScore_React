import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/Login/LoginForm';
import { BrowserRouter as Router, Route, Routes,  useParams, useNavigate, useLocation, Navigate} from 'react-router-dom';
import './App.scss';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Contacts from './components/Contacts';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { parseJwt } from './components/jwtUtils';

function authenticated() {
  const token = localStorage.getItem('token');
  return token;
}
function App() {

  //const token = getToken();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation(); 
  const {pathname} = location; 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isUpdatedUser, setIsUpdatedUser] = useState(false); 
  

  useEffect(() => {
    const token = authenticated();
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken && parsedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        const id_user = parsedToken.id_user;
        const username = parsedToken.username;
        setUser({ id: id_user, username: username });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);  
  

  // if (!isAuthenticated) {
  //   return <Navigate to="StudScore/" />;
  // }

  return (

    <div className="App">
      {(pathname === '/StudScore/statistics' || pathname === '/StudScore/profile' || pathname ==='/StudScore/contacts') ? 
        <Navbar user={user} isUpdatedUser={isUpdatedUser}/> : null}
        <Routes>
          <Route path="/" element={<LoginForm setToken={setToken} />} />
          <Route path="StudScore/" element={<LoginForm setToken={setToken} />} />
          <Route path="StudScore/statistics" element={<Statistics user={user}/>} />
          <Route path="StudScore/profile" element={<Profile user={user} setIsUpdatedUser={setIsUpdatedUser}/>} />
          <Route path="StudScore/contacts" element={<Contacts user={user}/>} />
        </Routes>
        {(pathname === '/StudScore/statistics' || pathname === '/StudScore/profile' || pathname ==='/StudScore/contacts')  ? <Footer/> : null}
    </div>
  );
}

export default App;