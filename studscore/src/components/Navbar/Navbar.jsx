import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react";
import './Navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLineChart, faUser, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AiFillStar } from 'react-icons/ai';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    function handleMenuToggle() {
        setMenuOpen(!menuOpen);
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
          <p id="firstlastname">Кудибовська Анастасія</p>
          <div className="rating-mark-block">
            <p id="rating-mark">92.975</p> 
            <AiFillStar className="fa fa-star"/>
            {/* <FontAwesomeIcon icon={faStar} className="fa fa-star" aria-hidden="true"  /> */}
          </div>
        </h2>
        </div>
        
    <nav className="custom-navb">
        <ul className="menu">
            <li style={{ paddingTop: "1.5rem" }}>
            <NavLink to="/statistics" className="active">
                <FontAwesomeIcon icon={faLineChart} className="fa"/>
                <p>Статистика</p>
            </NavLink>
            </li>
            <li>
            <NavLink to="/profile" className="active">
                <FontAwesomeIcon icon={faUser} className="fa" />
                <p>Профіль</p>
            </NavLink>
            </li>
            <li>
            <NavLink to="/contacts" className="active">
                <FontAwesomeIcon icon={faPhone} className="fa"/>
                <p>Контакти</p>
            </NavLink>
            </li>
            <hr />
            <li>
            <NavLink to="/" className="active">
                <FontAwesomeIcon icon={faSignOutAlt} className="fa"/>
                <p>Вийти</p>
            </NavLink>
            </li>
        </ul>
    </nav>
    
    </div>

  );
};

export default Navbar;