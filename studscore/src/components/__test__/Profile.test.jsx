import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

describe('Profile', () => {
  const mockUser = {
    username: 'testUser',
    id: 'testId'
  };

  test('Given valid user data, it should renders ProfileForm and ChangePasswordForm components', () => {
    render(<Profile user={mockUser} setIsUpdatedUser={jest.fn()} />);
  
    expect(screen.getByText('Профіль')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
    expect(screen.getByTestId('change-password-form')).toBeInTheDocument();
  });
  

  test('Given valid user data, it should passes user prop to ProfileForm and ChangePasswordForm', () => {
    const mockUser = { username: 'testUser', id: 'testId' };
    render(<Profile user={mockUser} setIsUpdatedUser={jest.fn()} />);
  
    const profileForm = screen.getByTestId('profile-form');
    const changePasswordForm = screen.getByTestId('change-password-form');
  
    expect(profileForm).toHaveAttribute('data-user', JSON.stringify(mockUser));
    expect(changePasswordForm).toHaveAttribute('data-user', JSON.stringify(mockUser));
  });
  
});
