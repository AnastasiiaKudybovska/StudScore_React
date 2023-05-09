import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ResetPasswordForm from './ResetPasswordForm';


function ForgotPasswordButton() {
  const handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className='custom-ui-title'>Відновлення пароля</h1>
            <ResetPasswordForm onClose={onClose} />
          </div>

        );
      }
    });
  };

  return (
    <button className="forgot-action forgot-password-btn" onClick={handleClick}>
      Забули пароль?
    </button>
  );
}

export default ForgotPasswordButton;
