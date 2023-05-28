import React from 'react';
import LoginForm from '../Login/LoginForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';

jest.mock('../AxiosClient'); // Mock the AxiosClient module

describe('LoginForm', () => {
  test('Should renders login form', () => {
    render(
      <BrowserRouter>
        <LoginForm setToken={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Ім'я користувача")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Пароль")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeInTheDocument();
  });

  test('Given valid credentials, it should submits login form', async () => {
    const mockPost = jest.fn().mockResolvedValueOnce({ status: 200, data: { token: 'testToken' } });
    const mockSetItem = jest.fn();
    const mockSetToken = jest.fn();
    AxiosClient.post.mockImplementation(mockPost);
    Object.defineProperty(window.localStorage, 'setItem', {
      value: mockSetItem
    });

    render(
      <BrowserRouter>
        <LoginForm setToken={mockSetToken} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ім'я користувача"), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), { target: { value: 'testPassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(mockPost).toHaveBeenCalledWith('/login', {
      username: 'testUser',
      password: 'testPassword'
    });

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('testToken');
      expect(window.location.pathname).toBe('/StudScore/statistics');
    });
  });

  test('Given invalid credentials (incorrect password), it should displays error message', async () => {
    AxiosClient.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: {
            message: 'Authorization is not successful'
          }
        }
      }
    });

    render(
      <BrowserRouter>
        <LoginForm setToken={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ім'я користувача"), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), { target: { value: 'incorrectPassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(AxiosClient.post).toHaveBeenCalledWith('/login', {
      username: 'testUser',
      password: 'incorrectPassword'
    });

    await waitFor(() => {
      expect(screen.getByText('Неправильний пароль')).toBeInTheDocument();
    });
  });

  test('Given invalid credentials (user not found), it should displays error message', async () => {
    AxiosClient.post.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          error: {
            message: 'Not found'
          }
        }
      }
    });

    render(
      <BrowserRouter>
        <LoginForm setToken={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ім'я користувача"), { target: { value: 'testUserNotFound' } });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), { target: { value: 'Password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(AxiosClient.post).toHaveBeenCalledWith('/login', {
      username: 'testUserNotFound',
      password: 'Password'
    });

    await waitFor(() => {
      expect(screen.getByText('Користувача не знайдено')).toBeInTheDocument();
    });
  });

  test('Given invalid credentials (with other errors), it should displays error message', async () => {
    AxiosClient.post.mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          error: {
            message: 'Invalid request'
          }
        }
      }
    });

    render(
      <BrowserRouter>
        <LoginForm setToken={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Ім'я користувача"), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), { target: { value: 'Password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(AxiosClient.post).toHaveBeenCalledWith('/login', {
      username: 'testUser',
      password: 'Password'
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid request')).toBeInTheDocument();
    });
  });


});
