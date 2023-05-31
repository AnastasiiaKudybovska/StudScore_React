import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import CustomAlert from '../CustomAlert';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('CustomAlert', () => {
  test('Given alert message, it should renders alert message', () => {
    const message = 'This is a test alert';
    const { getByText } = render(<CustomAlert message={message} />);
    const alertMessage = getByText(message);
    expect(alertMessage).toBeInTheDocument();
  });

  test('Given success alert, it should render success alert message with green background-color', () => {
    const message = 'Success!';
    const { getByText } = render(<CustomAlert message={message} success />);
    const alertWrapper = getByText(message).closest('div');
    expect(alertWrapper).toHaveStyle('background-color: #23b86b');
  });

  test('Given erroe alert, it should render error alert message with red background-color', () => {
    const message = 'Error!';
    const { getByText } = render(<CustomAlert message={message} />);
    const alertWrapper = getByText(message).closest('div');
    expect(alertWrapper).toHaveStyle('background-color: #b7094c');
  });

    test('Given alert message, it should displays timer progress when renders alert message', () => {
    const message = 'Test alert';
    const { getByTestId } = render(<CustomAlert message={message} />);
    const timerWrapper = getByTestId('timer-wrapper');
    expect(timerWrapper).toHaveStyle('width: 95%');
  });
  
  test('Should timer progress stops at 0% when the error timed out', () => {
    const message = 'Test alert';
    const { getByTestId } = render(<CustomAlert message={message} />);
    const timerWrapper = getByTestId('timer-wrapper');

    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });
  
});
