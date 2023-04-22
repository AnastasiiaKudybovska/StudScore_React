import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import './LoginForm.scss';
import CustomAlert from '../CustomAlert';

function LoginForm() {
    const url = "/login";

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertKey, setAlertKey] = useState(0);
    const navigate = useNavigate();

    const goToMain = () => {
      navigate('/statistics');
      //window.location.assign('/statistics');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();  
        AxiosClient.post(url, {
            username: login,
            password: password
        }).then((response) => {
            
            console.log(response);
            if (response.status === 200) {
                // console.log('yes')
                goToMain();
            }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (error.response.data.error.message == "Not found"){
            setAlertMessage("Користувача не знайдено");
            setAlertSuccess(false);
            setAlertKey(alertKey + 1); 
          }
          else if (error.response.data.error.message == "Authorization is not successful"){
            setAlertMessage("Неправильний пароль");
            setAlertSuccess(false);
            setAlertKey(alertKey + 1); 
          }
          else{
            setAlertMessage(error.response.data.error.message);
            setAlertSuccess(false);
            setAlertKey(alertKey + 1);
          }
        });      
    }



    return (
        <header>
      <div className="login-page">
        <div className="login-background"></div>
        <div className="login-logo">
          <h1 className="logo-text">StudScore</h1>
        </div>

        <div className="form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-control ng-untouched ng-pristine ng-invalid"
                formcontrolname="username"
                id="username"
                name="username"
                placeholder="Ім'я користувача"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="form-control ng-untouched ng-pristine ng-invalid"
                formcontrolname="password"
                id="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Увійти
            </button>
            <button 
                className="forgot-action forgot-password-btn" 
                type="submit"
                >
              Забули пароль?
            </button>
          </form>
        </div>
      </div>
      {alertMessage && (
        <CustomAlert key={alertKey} message={alertMessage} success={alertSuccess} />
      )}
    </header>
    );


}
export default LoginForm;