import { useEffect, useState } from 'react';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';

function ChangePasswordForm(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isPasswordsMatched, setIsPasswordsMatched] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const user = props.user ? props.user : null;

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && user.username){
      AxiosClient.put(`/user/${props.user.username}/change_pass`, 
        {
          old_password: oldPassword,
          password: newPassword
        })
        .then((response) => {
          if (response.status === 200){
            // console.log(response.data)
            setAlertMessage("Пароль змінено!");
            setAlertSuccess(true);
            setAlertKey(alertKey + 1);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log('Помилка: недостатньо прав для зміни пароля');
            setAlertMessage("Старий пароль введено неправильно!");
            setErrorMessage("Старий пароль введено неправильно!");
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
    setErrorMessage('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsFormValid(false);
    setIsFormChanged(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    if((newPassword!= '' && confirmPassword != '')){
      setIsPasswordsMatched(newPassword === confirmPassword)
    }
    else{
      setErrorMessage('')
      setIsPasswordsMatched(true)
    }
  }, 
  [newPassword, confirmPassword]);
  
  useEffect(() => {
    if (isPasswordsMatched){
      setErrorMessage('')
    }
    else{
      setErrorMessage('Паролі не співпадають.')
    }
  }, 
  [isPasswordsMatched]);

  useEffect(() => {
    setIsFormChanged(
      oldPassword !== '' && newPassword !== '' && confirmPassword !== ''
    );
  }, 
  [oldPassword, newPassword, confirmPassword]);

  const handleBlur = (event) => {
    setIsFormValid(event.target.form.checkValidity());
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="row mb-5 gx-5">
        <div className="col-xxl-9 mb-5 mb-xxl-0">
          <div className="bg-secondary-soft px-4 py-5 ">
            <div className="row g-3">
              <h4 className="mt-0 h2-place">Змінити пароль</h4>
              <div className="col-md-6 ch-pass">
                <label htmlFor="oldPassword" className="form-label">
                  Старий пароль
                </label>
                <input
                  type="password"
                  className={`form-control 
                    ${errorMessage === "Старий пароль введено неправильно!" && 'invalid'}`}
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                 
                />
              </div>
              <div className="col-md-6 ch-pass">
                <label htmlFor="newPassword" className="form-label">
                  Новий пароль
                </label>
                <input
                  type="password"
                  className={`form-control 
                    ${!isPasswordsMatched && 'invalid'} 
                    ${errorMessage === "Старий пароль введено неправильно!" && 'invalid'}`}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
               //   title="Пароль повинен містити щонайменше 8 символів, одну цифру, одну велику та малу літери"
                />
              </div>
              <div className="col-md-12 ch-pass">
                <label htmlFor="confirmPassword" className="form-label"> 
                    Підтвердження пароля
                </label>
                <input
               type="password"
               className={`form-control 
                ${!isPasswordsMatched && 'invalid'}  
                ${errorMessage === "Старий пароль введено неправильно!" && 'invalid'}`}
               id="confirmPassword"
               name="confirmPassword"
               value={confirmPassword}
               onChange={handleInputChange}
               onBlur={handleBlur}
             />
            </div>
            {/* <div className="col-md-12">
            {{isFormChanged, isFormChanged} && (
                <label className="text-danger">{errorMessage}</label>
            )}
            {success && (
                <label className="text-success">Пароль змінено</label>
            )}
            </div> */}
            <div className="button-update d-md-flex justify-content-md-end text-center" style={{marginTop:"0.3rem"}}>
                <div className="error_changeprofile_text">
                  <p className={errorMessage ? 'show' : 'hide'}>
                    {errorMessage ? errorMessage : "\u00A0"}
                  </p>
                </div>
                <button 
                 type="submit" 
                 id="changePassBtn" 
                 className="btn btn-lg"
                 disabled={!isFormChanged || !isFormValid || !isPasswordsMatched}
                 >
                Змінити</button>
            </div>
        </div>
        </div>
    </div>
    </div>
    </form>
    {alertMessage && (
      <CustomAlert 
        key={alertKey} 
        message={alertMessage} 
        success={alertSuccess} />
    )} 
    </>
);
};
  
  export default ChangePasswordForm;
