import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ChangePasswordForm from '../ProfileForms/ChangePasswordForm';
import AxiosClient from '../AxiosClient';


jest.mock('../AxiosClient');


describe('ChangePasswordForm', () => {
  test('Given a form with input fields, it should render the form', () => {
    const { getByLabelText } = render(<ChangePasswordForm />);
    expect(getByLabelText('Старий пароль')).toBeInTheDocument();
    expect(getByLabelText('Новий пароль')).toBeInTheDocument();
    expect(getByLabelText('Підтвердження пароля')).toBeInTheDocument();
  });

  test('Given an unchanged or invalid form, it should disable the submit button', () => {
    const { getByLabelText, getByText } = render(<ChangePasswordForm />);
    
    const oldPasswordInput = getByLabelText('Старий пароль');
    const newPasswordInput = getByLabelText('Новий пароль');
    const confirmPasswordInput = getByLabelText('Підтвердження пароля');
    const submitButton = getByText('Змінити');
    
    expect(submitButton).toBeDisabled();
  
    fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
    
    const updatedSubmitButton = getByText('Змінити');
    expect(updatedSubmitButton).toHaveAttribute('disabled');
    
    fireEvent.change(oldPasswordInput, { target: { value: '' } });
  
    const disabledSubmitButton = getByText('Змінити');
    expect(disabledSubmitButton).toBeDisabled();
  });
  
  test('Given mismatched passwords, it should display an error message', () => {
    const { getByLabelText, getByText } = render(<ChangePasswordForm />);
    
    const newPasswordInput = getByLabelText('Новий пароль');
    const confirmPasswordInput = getByLabelText('Підтвердження пароля');
    
    fireEvent.change(newPasswordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
    
    const errorText = getByText('Паролі не співпадають.');
    expect(errorText).toBeInTheDocument();
  });
  
  test('Given an input blur event, it should update the form validity', () => {
    const { getByLabelText, getByText } = render(<ChangePasswordForm />);
    
    const confirmPasswordInput = getByLabelText('Підтвердження пароля');
    const submitButton = getByText('Змінити');
  
    expect(submitButton).toBeDisabled();
  
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.blur(confirmPasswordInput);
    
    const updatedSubmitButton = getByText('Змінити');
    expect(updatedSubmitButton).not.toHaveAttribute('disabled', 'disabled');
  });

 const user = {
      id: 1,
      username: 'testuser',
    };
  
    test('Given correct data, it should submit the form successfully', async () => {
      const mockPut = jest.spyOn(AxiosClient, 'put');
      mockPut.mockResolvedValue({ status: 200 });
    
      const { getByLabelText, getByText, getByTestId } = render(<ChangePasswordForm user={user} />);
    
      const oldPasswordInput = getByLabelText('Старий пароль');
      const newPasswordInput = getByLabelText('Новий пароль');
      const confirmPasswordInput = getByLabelText('Підтвердження пароля');
      const submitButton = getByText('Змінити');
    
      act(() => {
        fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
        fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
        fireEvent.submit(getByTestId('change-password-form'));
      });
    
      await waitFor(() => {
        expect(user).not.toBeNull();
        expect(user.username).toBeDefined();
        expect(mockPut).toHaveBeenCalledWith(`/user/${user.username}/change_pass`, {
          old_password: 'oldpassword',
          password: 'newpassword',
        });
        expect(getByText('Пароль змінено!')).toBeInTheDocument();
      });
    
      mockPut.mockRestore(); 
    });

  test('Given incorrect old password, it should display error message', async () => {
    const mockPut = jest.fn();
    AxiosClient.put.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: {
            message: 'Старий пароль введено неправильно!'
          }
        }
      }
    });
    

    const { getByLabelText, getByText, getByTestId } = render(<ChangePasswordForm user={user} />);
    const oldPasswordInput = getByLabelText('Старий пароль');
    const newPasswordInput = getByLabelText('Новий пароль');
    const confirmPasswordInput = getByLabelText('Підтвердження пароля');
    const submitButton = getByText('Змінити');
    fireEvent.change(oldPasswordInput, { target: { value: 'incorrectpassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.submit(getByTestId('change-password-form'));

    await waitFor(() => {
      expect(getByText('Старий пароль введено неправильно!')).toBeInTheDocument();
    });
  });

  test('Given incorrect data, it should display error message', async () => {
    const mockPut = jest.fn();
    AxiosClient.put.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          error: {
            message: 'Користувача не знайдено!'
          }
        }
      }
    });

    const { getByLabelText, getByText, getByTestId } = render(<ChangePasswordForm user={user} />);
    const oldPasswordInput = getByLabelText('Старий пароль');
    const newPasswordInput = getByLabelText('Новий пароль');
    const confirmPasswordInput = getByLabelText('Підтвердження пароля');
    const submitButton = getByText('Змінити');
    fireEvent.change(oldPasswordInput, { target: { value: 'incorrectpassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.submit(getByTestId('change-password-form'));

    await waitFor(() => {
      expect(getByText('Користувача не знайдено!')).toBeInTheDocument();
    });

  });
  
  

    
});