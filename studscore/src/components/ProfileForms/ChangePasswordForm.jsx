import { useState } from 'react';

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Підтвердження пароля не співпадає з новим паролем');
      return;
    }
    setErrorMessage('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsFormValid(false);
    setIsFormChanged(false);
    alert('Пароль змінено');
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

  const handleBlur = (event) => {
    const { name } = event.target;
    setIsFormValid(event.target.form.checkValidity());
    setIsFormChanged(
      oldPassword !== '' || newPassword !== '' || confirmPassword !== ''
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-5 gx-5">
        <div className="col-xxl-9 mb-5 mb-xxl-0">
          <div className="bg-secondary-soft px-4 py-5 ">
            <div className="row g-3">
              <h4 className="mt-0 h2-place">Змінити пароль</h4>
              <div className="col-md-6">
                <label htmlFor="oldPassword" className="form-label">
                  Старий пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">
                  Новий пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Пароль повинен містити щонайменше 8 символів, одну цифру, одну велику та малу літери"
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="confirmPassword" className="form-label"> 
                    Підтвердження пароля
                </label>
                <input
               type="password"
               className="form-control"
               id="confirmPassword"
               name="confirmPassword"
               value={confirmPassword}
               onChange={handleInputChange}
               onBlur={handleBlur}
             />
            </div>
            <div className="col-md-12">
            {/* {{isFormChanged, isFormChanged} && (
                <label className="text-danger">{errorMessage}</label>
            )} */}
            {/* {success && (
                <label className="text-success">Пароль змінено</label>
            )} */}
            </div>
            <div className="button-update gap-3 d-md-flex justify-content-md-end text-center">
                <div id="error_changepass_text"></div>
                <button 
                 type="button" 
                 id="changePassBtn" 
                 className="btn btn-lg"
                 disabled={!isFormChanged || !isFormValid}
                 >
                Змінити</button>
            </div>
        </div>
        </div>
    </div>
    </div>
    </form>
);
};
  
  export default ChangePasswordForm;
