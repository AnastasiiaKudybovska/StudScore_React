import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";
import CustomAlert from "../CustomAlert";

function ResetPasswordFormWithCode(props) {
    const [isResetPassFormValid, setIsResetPassFormValid] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertKey, setAlertKey] = useState(0);
    
  
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
    const [passError, setPassError] = useState('');
    const [isPasswordsMatched, setIsPasswordsMatched] = useState(true);
   
    const [isFormChanged, setIsFormChanged] = useState(false);
   
    useEffect(() => {
      if((newPassword!= '' && confirmNewPassword!= '')){
        setIsPasswordsMatched(newPassword === confirmNewPassword)
      }
      else{
        setPassError('')
        setIsPasswordsMatched(true)
      }
  }, [newPassword, confirmNewPassword]);
  
  useEffect(() => {
      if (isPasswordsMatched){
          setPassError('')
      }
       else{
          setPassError('Паролі не співпадають.')
      }
  }, [isPasswordsMatched]); 

  useEffect(() => {
    if (verificationCode !== '' && newPassword !== '' && confirmNewPassword !== ''){
        setIsFormChanged(true);
    }
    else{
        setIsFormChanged(false); 
    }
  }, [verificationCode, newPassword, confirmNewPassword]);
  
  const handleBlur = (event) => {
    setIsResetPassFormValid(event.target.form.checkValidity());
  };

  const resetNewPassSubmit = (event) => {
   // props.setIsPasswordChanged(false);
    event.preventDefault();
    if(props.email){
     AxiosClient.post(`/user/reset_pass`, 
         {
            email: props.email,
            password: newPassword,
            confirmation_code:verificationCode
        })
        .then((response) => {
        if (response.status === 200){
         //  console.log(response.data)
         setAlertMessage("Пароль змінено!");
         setAlertSuccess(true);
         setAlertKey(alertKey + 1);
        // props.setIsPasswordChanged(true);

        }})
    .catch((error) => {
      if (error.response.status === 404){
      console.log(error);
      setAlertMessage("Не знайдено користувача з такою електронною поштою!");
      setPassError("Не знайдено користувача з такою електронною поштою!")
      setAlertSuccess(false);
      setAlertKey(alertKey + 1);
      }
      else if(error.response.status === 403)
      {
        console.log(error);
        setAlertMessage("Код підтвердження неправильний!");
        setPassError("Код підтвердження неправильний!")
        setAlertSuccess(false);
        setAlertKey(alertKey + 1);
      }
      else{
        console.log(error);
        setAlertMessage(error.response.data.error.message);
        setAlertSuccess(false);
        setAlertKey(alertKey + 1);
      }
    });
    }
    setIsFormChanged(false);
    setIsResetPassFormValid(false);
    setPassError(false);
  };

    return (
      <>
       {/* {!props.isPasswordChanged && ( */}
        <form onSubmit={resetNewPassSubmit}> <div className='form-group cust-ui-alert-conf' >
            <p>Код підтвердження надіслано! Перевірте свою електронну пошту.</p>
            <label htmlFor='verificationCode'>Код підтвердження</label>
            <input
                type='text'
                id='verificationCode'
                name='verificationCode'
                className={`form-control 
                    ${passError === "Код підтвердження неправильний!" && 'invalid'}`}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                onBlur={handleBlur}
            />
            </div>
            <div className='form-group cust-ui-alert-conf'>
                <label htmlFor='newPassword'>Новий пароль</label>
                <input
                    type='password'
                    id='newPassword'
                    name='newPassword'
                    className={`form-control ${!isPasswordsMatched && 'invalid'}`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={handleBlur}
                />
            </div>
            <div className='form-group cust-ui-alert-conf'>
                <label htmlFor='confirmNewPassword'>Підтвердження нового пароля</label>
                <input
                    type='password'
                    id='confirmNewPassword'
                    name='confirmNewPassword'
                    value={confirmNewPassword}
                    className={`form-control ${!isPasswordsMatched && 'invalid'}`}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    onBlur={handleBlur}
                />
                </div>
                    <div className="error_changeprofile_text">
                        <p className={passError ? 'show' : 'hide'}>
                            {passError ? passError : "\u00A0"}
                        </p>
                    </div>
                    <button 
                        type="submit" 
                        disabled={!isFormChanged || !isResetPassFormValid || !isPasswordsMatched}
                        className={`login-btn ${!isResetPassFormValid || !isFormChanged || !isPasswordsMatched? 'btn-disabled-fp' : ''}`} 
                    >
                   Відновити пароль
                   </button>
        </form>  
         {/*)} 
         {props.isPasswordChanged && (
          <div className=" cust-ui-alert-conf">
          <p style={{textAlign:"center"}}>Ваш пароль відновлено успішно!</p>
          </div>
        )} */}
      
      {alertMessage && (
          <CustomAlert 
            key={alertKey} 
            message={alertMessage} 
            success={alertSuccess} />
          )}       
          </>
    );
  }
  
  export default ResetPasswordFormWithCode;
