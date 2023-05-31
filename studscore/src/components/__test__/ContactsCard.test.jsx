import React from 'react';
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ContactsCard from '../ContactsCard';
import AxiosClient from '../AxiosClient';

jest.mock('../AxiosClient', () => ({
    post: jest.fn(),
  }));

describe('ContactsCard', () => {

    afterEach(() => {
        jest.clearAllMocks();
      });

  test('Given valid user data, it should renders the contacts card component', () => {
    render(<ContactsCard />);
    const contactsCardElement = screen.getByTestId('contacts-card');
    expect(contactsCardElement).toBeInTheDocument();
  });

  test('Given form fields are empty, it should disables submit button', () => {
    render(<ContactsCard />);
    const submitButton = screen.getByRole('button', { name: 'Надіслати' });
    expect(submitButton).toBeDisabled();
  });

  test('Given form fields are filled, it should enables submit button', () => {
    render(<ContactsCard />);
    const subjectInput = screen.getByPlaceholderText('Тема');
    const messageInput = screen.getByPlaceholderText('Повідомлення');
    const submitButton = screen.getByRole('button', { name: 'Надіслати' });

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    expect(subjectInput.value).toBe('Test Subject');
    expect(messageInput.value).toBe('Test Message');
    expect(submitButton).toBeEnabled();
  });

  test('When the form is successfully submitted, it should display a success messages', async () => {
    const mockUser = {
      username: 'testUser',
    };
  
    const mockResponse = {
      status: 200,
      data: {},
    };

    const mockPost = jest.fn().mockResolvedValue(mockResponse);
    require('../AxiosClient').post.mockImplementation(mockPost);

    const { getByTestId, getByPlaceholderText, getByText } = render(<ContactsCard user={mockUser} />);

    const subjectInput = getByPlaceholderText('Тема');
    const messageInput = getByPlaceholderText('Повідомлення');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(`/user/${mockUser.username}/send_msg`, {
        subject: 'Test subject',
        text: 'Test message',
      });
      expect(getByText('Повідомлення успішно надіслане!')).toBeInTheDocument();
    });
  });


  test('Given null user data, it  should not submit the form', async () => {
    const { getByTestId, getByPlaceholderText, queryByText } = render(<ContactsCard user={null} />);
  
    const subjectInput = getByPlaceholderText('Тема');
    const messageInput = getByPlaceholderText('Повідомлення');
    const submitButton = getByTestId('submit-button');
  
    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(queryByText('Повідомлення успішно надіслане!')).not.toBeInTheDocument();
    });
  });
  
  test('Given user.username is undefined, it  should not submit the form', async () => {
    const mockUser = {
      username: undefined,
    };
  
    const { getByTestId, getByPlaceholderText, queryByText } = render(<ContactsCard user={mockUser} />);
  
    const subjectInput = getByPlaceholderText('Тема');
    const messageInput = getByPlaceholderText('Повідомлення');
    const submitButton = getByTestId('submit-button');
  
    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(queryByText('Повідомлення успішно надіслане!')).not.toBeInTheDocument();
    });
  });
  
  test('When the form submission fails, it should display an error message', async () => {
    const mockUser = {
      username: 'testUser',
    };
  
    const errorResponse = {
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
    };
  
    const mockPost = jest.fn().mockRejectedValue(errorResponse);
    require('../AxiosClient').post.mockImplementation(mockPost);
  
    const { getByTestId, getByPlaceholderText, getByText } = render(<ContactsCard user={mockUser} />);
  
    const subjectInput = getByPlaceholderText('Тема');
    const messageInput = getByPlaceholderText('Повідомлення');
    const submitButton = getByTestId('submit-button');
  
    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(`/user/${mockUser.username}/send_msg`, {
        subject: 'Test subject',
        text: 'Test message',
      });
      expect(getByText('Not found')).toBeInTheDocument();
    });
  });
  
  test('Should not submit the form and display error message when response status is not 200', async () => {
    const mockUser = {
      username: 'testUser',
    };
  
    const mockResponse = {
      status: 400,
      data: {},
    };
  
    const mockPost = jest.fn().mockResolvedValue(mockResponse);
    require('../AxiosClient').post.mockImplementation(mockPost);
  
    const { getByTestId, getByPlaceholderText, getByText } = render(<ContactsCard user={mockUser} />);
  
    const subjectInput = getByPlaceholderText('Тема');
    const messageInput = getByPlaceholderText('Повідомлення');
    const submitButton = getByTestId('submit-button');
  
    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(`/user/${mockUser.username}/send_msg`, {
        subject: 'Test subject',
        text: 'Test message',
      });
     
    });
  });


});

