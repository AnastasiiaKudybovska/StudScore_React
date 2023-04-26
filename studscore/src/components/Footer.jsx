import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLineChart, faUser, faPhone} from '@fortawesome/free-solid-svg-icons';
import { FaMapMarkerAlt, FaGithub,  FaFacebookF, FaTwitter, FaLinkedinIn} from 'react-icons/fa';
import { BsFillEnvelopeFill } from 'react-icons/bs';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
  return (
    <> 
    <footer className="site-footer">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                <h1 className="logo-text">StudScore</h1>
                <p className="text-justify" style={{ paddingRight: '3rem' }}>
              Ми допоможемо відслідковувати свій прогрес, покращувати результати навчання та краще підготуватись до
              занять та іспитів. Ви зможете переглядати свої оцінки та рейтинг, зконтактуватись з викладачи, а також мати
              цілодобовий доступ до навчальних матеріалів.
                </p>
                </div>
                <div className="col-xs-6 col-md-2 ch-2">
                <h6 className="child2">Лінки</h6>
                <ul className="footer-links">
                <li>
                   <Link to="/statistics">
                        <FontAwesomeIcon icon={faLineChart} className="fa"/>
                        <p>Статистика</p>
                    </Link>
                </li>
              <li>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUser} className="fa" />
                  <p>Профіль</p>
                </Link>
              </li>
              <li>
                <Link to="/contacts">
                    <FontAwesomeIcon icon={faPhone} className="fa"/>
                    <p>Контакти</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-4 ch-2">
              <h6 className="child2">Контактна інформація</h6>
              <ul className="footer-links">
                <li><Link to=""><FaMapMarkerAlt className="fa"/><p>м. Львів</p></Link></li>
                <li><Link to=""><FontAwesomeIcon icon={faPhone} className="fa"/><p>+380 73 222 17 93</p></Link></li>
                <li><Link to=""><BsFillEnvelopeFill className="fa"/><p>support@studscore.com</p></Link></li>
              </ul>
            </div>           
            </div>
            <hr/>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p>Copyright &copy; 2023 All Rights Reserved by 
           <a className="copyright-text"href="#">StudScore</a>.
              </p>
            </div>
  
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><Link className="github" to="https://github.com/AnastasiiaKudybovska/StudScore"><FaGithub className='fa fa-facebook'/></Link></li>
                <li><Link className="facebook" to="#"><FaFacebookF className="fa fa-facebook"/></Link></li>
                <li><Link className="twitter" to="#"><FaTwitter className="fa fa-twitter"/></Link></li>
                <li><Link className="linkedin" to="#"><FaLinkedinIn className="fa fa-linkedin"/></Link></li>   
              </ul>
            </div>
          </div>
        </div>
    </footer>
   </>
  );
};

export default Footer;