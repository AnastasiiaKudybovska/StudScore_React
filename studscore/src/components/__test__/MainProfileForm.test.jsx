import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from '../ProfileForms/MainProfileForm';
import AxiosClient from '../AxiosClient';
jest.mock('../AxiosClient');

describe('ProfileForm', () => {
   const user = {
        id: 1,
        username: 'testuser',
      };
    
      const userData = {
        user: {
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
        date_of_birthday: '2000-01-01',
        group: {
          name: 'Group A',
        },
        date_of_entry: '2021-01-01',
        date_of_graduation: '2025-01-01',
      };
      afterEach(() => {
        jest.clearAllMocks();
      });
      
    test('Given loaded user data, it should renders form inputs correctly', async () => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        
        await waitFor(() => {
          expect(screen.getByLabelText("First name")).toBeInTheDocument();
          expect(screen.getByLabelText("Last name")).toBeInTheDocument();
          expect(screen.getByLabelText("User name")).toBeInTheDocument();
          expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
          expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
        });
      });
    
    test('Given loading user data, it should displays loading spinnner', () => {
        render(<ProfileForm />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });

    test('Given form is not changed, it should disables submit button', async () => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
      render(<ProfileForm user={user} />);
      await waitFor(() => {
        expect(screen.getByLabelText("First name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name")).toBeInTheDocument();
        expect(screen.getByLabelText("User name")).toBeInTheDocument();
        expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
        expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
      });
      const submitButton = screen.getByText('Зберегти');
      expect(submitButton).toBeDisabled();
    });
  
    test('Given fetched user data, it should set form fields', async () => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        
        await waitFor(() => {    
          expect(screen.getByLabelText("First name")).toBeInTheDocument();
          expect(screen.getByLabelText("Last name")).toBeInTheDocument();
          expect(screen.getByLabelText("User name")).toBeInTheDocument();
          expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
          expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
        });
        
        expect(AxiosClient.get).toHaveBeenCalledTimes(1);
        expect(AxiosClient.get).toHaveBeenCalledWith(`/students/${user.id}`);

        await waitFor(() => {    
            expect(screen.getByLabelText('First name')).toHaveValue(userData.user.first_name);
            expect(screen.getByLabelText('Last name')).toHaveValue(userData.user.last_name);
            expect(screen.getByLabelText('User name')).toHaveValue(userData.user.username);
            expect(screen.getByLabelText('inputEmail4')).toHaveValue(userData.user.email);
            expect(screen.getByLabelText('Phone number')).toHaveValue(userData.user.phone);
          });
      });

      test('Given failed user data fetch, it should display an error message', async () => {
        const error = { status: 404, response: { status: 404, data: { error: { message: 'Test error message' } } } };
        AxiosClient.get.mockRejectedValueOnce(error);
        render(<ProfileForm user={user} />);
      
        await waitFor(() => {
          expect(screen.getByLabelText("First name")).toBeInTheDocument();
          expect(screen.getByLabelText("Last name")).toBeInTheDocument();
          expect(screen.getByLabelText("User name")).toBeInTheDocument();
          expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
          expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
        });
      
        expect(AxiosClient.get).toHaveBeenCalledTimes(1);
        expect(AxiosClient.get).toHaveBeenCalledWith(`/students/${user.id}`);
      
        await waitFor(() => {
             expect(screen.getByText('Test error message')).toBeInTheDocument();
        });
      
    
      });
      
      test('Given loaded user data, when the first name input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });

        const firstNameInput = screen.getByLabelText('First name');
        fireEvent.change(firstNameInput, { target: { value: 'John123' } });
      
        expect(screen.getByText('Ім\'я не може містити цифри та інші спеціальні символи.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Ім\'я не може містити цифри та інші спеціальні символи.');
      
        fireEvent.change(firstNameInput, { target: { value: '' } });
      
        expect(screen.getByText('Ім\'я не може бути порожнім.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Ім\'я не може бути порожнім.');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
      
        expect(screen.queryByText('Ім\'я не може містити цифри та інші спеціальні символи.')).toBeNull();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('');
      });
      
      test('Given loaded user data, when the last name input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });

        const lastNameInput = screen.getByLabelText('Last name');
        fireEvent.change(lastNameInput, { target: { value: 'Doe123' } });
      
        expect(screen.getByText('Прізвище не може містити цифри та інші спеціальні символи.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Прізвище не може містити цифри та інші спеціальні символи.');
      
        fireEvent.change(lastNameInput, { target: { value: '' } });
      
        expect(screen.getByText('Прізвище не може бути порожнім.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Прізвище не може бути порожнім.');

        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      
        expect(screen.queryByText('Прізвище не може містити цифри та інші спеціальні символи.')).toBeNull();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('');
      });
      
      test('Given loaded user data, when the user name input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });

        const userNameInput = screen.getByLabelText('User name');
      
        fireEvent.change(userNameInput, { target: { value: '' } });
      
        expect(screen.getByText('Ім\'я користувача не може бути порожнім.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Ім\'я користувача не може бути порожнім.');

        fireEvent.change(userNameInput, { target: { value: 'johndoe' } });
      
        expect(screen.queryByText('Ім\'я користувача не може бути порожнім.')).toBeNull();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('');
      });

      test('Given loaded user data, when the date of birthday input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });
      
        const dateOfBirthdayInput = screen.getByLabelText('Date of birthday');
        fireEvent.change(dateOfBirthdayInput, { target: { value: '2022-01-01' } });
      
        expect(dateOfBirthdayInput.value).toBe('2022-01-01');
      });
      
      test('Given loaded user data, when the email input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });

        const emailInput = screen.getByLabelText('inputEmail4');
        fireEvent.change(emailInput, { target: { value: 'johndoe' } });
      
        expect(screen.getByText('Некоректна електронна пошта.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Некоректна електронна пошта.');
      
        fireEvent.change(emailInput, { target: { value: '' } });
        expect(screen.getByText('Електронна пошта не може бути порожною.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Електронна пошта не може бути порожною.');
        

        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
      
        expect(screen.queryByText('Некоректна електронна пошта.')).toBeNull();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('');
      });

      test('Given loaded user data, when the phone number input changes, it should validate the input', async() => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        render(<ProfileForm user={user} />);
        await waitFor(() => {    
            expect(screen.getByLabelText("First name")).toBeInTheDocument();
            expect(screen.getByLabelText("Last name")).toBeInTheDocument();
            expect(screen.getByLabelText("User name")).toBeInTheDocument();
            expect(screen.getByLabelText("inputEmail4")).toBeInTheDocument();
            expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
          });

        const phoneInput = screen.getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: '1234567890m' } });
      
        expect(screen.getByText('Некоректний номер телефону.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Некоректний номер телефону.');
      
        fireEvent.change(phoneInput, { target: { value: '' } });
        expect(screen.getByText('Номер телефону не може бути порожнім.')).toBeInTheDocument();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('Номер телефону не може бути порожнім.');
        

        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
      
        expect(screen.queryByText('Некоректний номер телефону.')).toBeNull();
        expect(screen.getByTestId('is-valid-1')).toHaveTextContent('');
      });

      test('Given form submission, it should save the updated user data', async () => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        AxiosClient.put.mockResolvedValue({ status: 200, data: { message: 'Зміни успішно збережені!' } });
      
        render(<ProfileForm user={user} setIsUpdatedUser={jest.fn()} />);
      
        await waitFor(() => {
          expect(screen.getByLabelText('First name')).toBeInTheDocument();
          expect(screen.getByLabelText('Last name')).toBeInTheDocument();
          expect(screen.getByLabelText('User name')).toBeInTheDocument();
          expect(screen.getByLabelText('inputEmail4')).toBeInTheDocument();
          expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
        });
      
        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');
        const userNameInput = screen.getByLabelText('User name');
        const emailInput = screen.getByLabelText('inputEmail4');
        const phoneNumberInput = screen.getByLabelText('Phone number');
        const saveButton = screen.getByText('Зберегти');
      
        const updatedUserData = {
          first_name: 'NewJohn',
          last_name: 'NewDoe',
          username: 'Newjohndoe',
          email: 'newjohndoe@example.com',
          phone: '1234567890111',
        };
      
        fireEvent.change(firstNameInput, { target: { value: updatedUserData.first_name } });
        fireEvent.change(lastNameInput, { target: { value: updatedUserData.last_name } });
        fireEvent.change(userNameInput, { target: { value: updatedUserData.username } });
        fireEvent.change(emailInput, { target: { value: updatedUserData.email } });
        fireEvent.change(phoneNumberInput, { target: { value: updatedUserData.phone } });
      
        fireEvent.click(saveButton);
      
        await waitFor(() => {
          expect(AxiosClient.put).toHaveBeenCalledTimes(1);
          expect(AxiosClient.put).toHaveBeenCalledWith(`/user/${user.username}`, updatedUserData);
          expect(screen.getByText('Зміни успішно збережені!')).toBeInTheDocument();
          expect(screen.getByLabelText('First name')).toHaveValue(updatedUserData.first_name);
          expect(screen.getByLabelText('Last name')).toHaveValue(updatedUserData.last_name);
          expect(screen.getByLabelText('User name')).toHaveValue(updatedUserData.username);
          expect(screen.getByLabelText('inputEmail4')).toHaveValue(updatedUserData.email);
          expect(screen.getByLabelText('Phone number')).toHaveValue(updatedUserData.phone);
        });

      });
      
      test('Given form submission fails, it should display an error message', async () => {
        AxiosClient.get.mockResolvedValue({ status: 200, data: userData });
        AxiosClient.put.mockRejectedValue({
            status: 404, 
            response: {
              status: 404,
                data: {
                 error: {
                    code: 404,
                      message: 'Not found'
                  }
                }
            } 
        });
      
        render(<ProfileForm user={user} setIsUpdatedUser={jest.fn()} />);
      
        await waitFor(() => {
          expect(screen.getByLabelText('First name')).toBeInTheDocument();
          expect(screen.getByLabelText('Last name')).toBeInTheDocument();
          expect(screen.getByLabelText('User name')).toBeInTheDocument();
          expect(screen.getByLabelText('inputEmail4')).toBeInTheDocument();
          expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
        });
      
        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');
        const userNameInput = screen.getByLabelText('User name');
        const emailInput = screen.getByLabelText('inputEmail4');
        const phoneNumberInput = screen.getByLabelText('Phone number');
        const saveButton = screen.getByText('Зберегти');
      
        const updatedUserData = {
          first_name: 'NewJohn',
          last_name: 'NewDoe',
          username: 'Newjohndoe',
          email: 'newjohndoe@example.com',
          phone: '1234567890111',
        };
      
        fireEvent.change(firstNameInput, { target: { value: updatedUserData.first_name } });
        fireEvent.change(lastNameInput, { target: { value: updatedUserData.last_name } });
        fireEvent.change(userNameInput, { target: { value: updatedUserData.username } });
        fireEvent.change(emailInput, { target: { value: updatedUserData.email } });
        fireEvent.change(phoneNumberInput, { target: { value: updatedUserData.phone } });
      
        fireEvent.click(saveButton);
      
        await waitFor(() => {
          expect(AxiosClient.put).toHaveBeenCalledTimes(1);
          expect(AxiosClient.put).toHaveBeenCalledWith(`/user/${user.username}`, updatedUserData);
          expect(screen.getByText("Not found")).toBeInTheDocument();
          expect(screen.getByLabelText('First name')).toHaveValue(updatedUserData.first_name);
          expect(screen.getByLabelText('Last name')).toHaveValue(updatedUserData.last_name);
          expect(screen.getByLabelText('User name')).toHaveValue(updatedUserData.username);
          expect(screen.getByLabelText('inputEmail4')).toHaveValue(updatedUserData.email);
          expect(screen.getByLabelText('Phone number')).toHaveValue(updatedUserData.phone);
        });
      });
});
