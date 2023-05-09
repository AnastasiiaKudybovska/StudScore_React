import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import './Navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLineChart, faUser, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AiFillStar } from 'react-icons/ai';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';

const Navbar = (props) => {
    const user = props.user ? props.user : null;
    const [menuOpen, setMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [userRatingMark, setUserRatingMark] = useState(null);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertKey, setAlertKey] = useState(0);
   
    function handleMenuToggle() {
        setMenuOpen(!menuOpen);
    }


    useEffect(() => {
        async function getUserInfo() {
          try {
            if (user && user.username) {
              const response = await AxiosClient.get(`/user/${user.username}`);
              if (response.status === 200) {
                setUserInfo(response.data);
              }
            }
          } catch (error) {
            console.log(error);
            setAlertMessage(error.response.data.error.message);
            setAlertSuccess(false);
            setAlertKey(alertKey + 1); 
          }
        }
        async function getUserRatingMark() {
            try {
              if (user && user.username) {
                const response = await AxiosClient.get(`/students/${user.username}/rating`);
                if (response.status === 200) {
                  setUserRatingMark(response.data)
                }
              }
            } catch (error) {
              console.log(error);
              setAlertMessage(error.response.data.error.message);
              setAlertSuccess(false);
              setAlertKey(alertKey + 1); 
            }
          }
        getUserInfo();
        getUserRatingMark();

        if(props.isUpdatedUser){
          getUserInfo();
          getUserRatingMark();
        }
      }, [user, props.isUpdatedUser]);
      
    function handleLogout() {
        localStorage.clear();
      }
      
  return (
    <div className="navbarWrapper">
        <input className="side-menu" type="checkbox" id="side-menu" checked={menuOpen} onChange={handleMenuToggle} />
        <label className="hamb" htmlFor="side-menu">
            <span className="hamb-line"></span>
        </label>
        <div className="logo-cont logo">
        <h1 className="logo-text">StudScore</h1>
        <h2 className="username-block">
          <p id="firstlastname">{userInfo.last_name} {userInfo.first_name}</p>
          <div className="rating-mark-block">
            <p id="rating-mark">{userRatingMark}</p> 
            <AiFillStar className="fa fa-star"/>
            {/* <FontAwesomeIcon icon={faStar} className="fa fa-star" aria-hidden="true"  /> */}
          </div>
        </h2>
        </div>
        
    <nav className="custom-navb">
        <ul className="menu">
            <li style={{ paddingTop: "1.5rem" }}>
            <NavLink to="StudScore/statistics" className="active">
                <FontAwesomeIcon icon={faLineChart} className="fa"/>
                <p>Статистика</p>
            </NavLink>
            </li>
            <li>
            <NavLink to="StudScore/profile" className="active">
                <FontAwesomeIcon icon={faUser} className="fa" />
                <p>Профіль</p>
            </NavLink>
            </li>
            <li>
            <NavLink to="StudScore/contacts" className="active">
                <FontAwesomeIcon icon={faPhone} className="fa"/>
                <p>Контакти</p>
            </NavLink>
            </li>
            <hr />
            <li>
            <NavLink to="StudScore/" className="active"  onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="fa"/>
                <p>Вийти</p>
            </NavLink>
            </li>
        </ul>
    </nav>
    {alertMessage && (
        <CustomAlert key={alertKey} message={alertMessage} success={alertSuccess} />
      )}
    </div>

  );
};

export default Navbar;