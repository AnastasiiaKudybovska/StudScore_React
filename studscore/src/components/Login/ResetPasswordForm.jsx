import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";
import CustomAlert from "../CustomAlert";
import { confirmAlert } from "react-confirm-alert";
import ResetPasswordFormWithCode from "./ResetPasswordFormWithCode";

function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFogotPassFormValid, setIsFogotPassFormValid] = useState(false);
    const [alertMessageReset, setAlertMessageReset] = useState('');
    const [alertSuccessReset, setAlertSuccessReset] = useState(false);
    const [alertKeyReset, setAlertKeyReset] = useState(0);
    
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      AxiosClient.post(`/user/send_msg_to_reset_pass`, 
           {email: email})
          .then((response) => {
          if (response.status === 200){
           //  console.log(response.data)
           setAlertMessageReset("Код підтвердження надіслано! Перевірте свою електронну пошту.");
           setAlertSuccessReset(true);
           setAlertKeyReset(alertKeyReset + 1);
           confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className="custom-ui">
                    <h1 className='custom-ui-title'>Відновлення пароля</h1>
                    <ResetPasswordFormWithCode 
                      onClose={onClose} 
                      email={email} 
                      // setIsPasswordChanged={setIsPasswordChanged}
                      // isPasswordChanged={isPasswordChanged}
                      />
                  </div>
                );
              }
            });
         }})
           
          .catch((error) => {
            if (error.response.status === 404){
            console.log(error);
            setAlertMessageReset("Не знайдено користувача з такою електронною поштою!");
            setEmailError("Не знайдено користувача з такою електронною поштою!")
            setAlertSuccessReset(false);
            setAlertKeyReset(alertKeyReset + 1);
            }
            else{
              console.log(error);
              setAlertMessageReset(error.response.data.error.message);
              setAlertSuccessReset(false);
              setAlertKeyReset(alertKeyReset + 1);
            }
          });
          setIsFogotPassFormValid(false);
          setEmailError('');
      };
    const isValidEmail = (email) => {
      const emailPattern = /(.+)?@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$/;
      return emailPattern.test(email);
    };
  
    const handleEmailChange = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
      if (!isValidEmail(emailValue) || emailValue == ''){
        setEmailError("Некоректна електронна пошта.");
      }
      else{
        setEmailError("");
      }
    };
    useEffect(() => {
      if(email && emailError === ''){
        setIsFogotPassFormValid(true);
      }
      else{
        setIsFogotPassFormValid(false);
      }
    }, [email])
    useEffect(() => {
      if(email === ''){
        setEmailError('');
      }
    
    }, [email, emailError])
    return (
      <>
      <form onSubmit={handleSubmit}>
        <div className="form-group cust-ui-alert-conf">
          <p className='custom-ui-p'>На вашу електронну пошту буде надіслано код для скидання пароля. </p>
          <label htmlFor="fogotPassEmail" className="form-label">
              Електронна пошта
          </label>
              <input
                  type="email"
                  className="form-control"
                  id="fogotPassEmail"
                  value={email}
                  placeholder="support@studscore.com"
                  pattern="(.)+@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$"
                  onChange={handleEmailChange}
                  />
        </div>    
        <div className="error_changeprofile_text">
          <p className={emailError ? 'show' : 'hide'}>
              {emailError ? emailError : "\u00A0"}
          </p>
         </div>
        <button 
          type="submit" 
          disabled={!isFogotPassFormValid}
          className={`login-btn ${!isFogotPassFormValid? 'btn-disabled-fp' : ''}`} 
          >
              Надіслати</button>
              {alertMessageReset && (
        
        <CustomAlert 
          key={alertKeyReset} 
          message={alertMessageReset} 
          success={alertSuccessReset} />
          
     )} 
      </form>      
          </>
    );
  }
  export default ResetPasswordForm;
