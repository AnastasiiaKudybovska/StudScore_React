import React from 'react';
import { render, screen } from '@testing-library/react';
import Contacts from '../Contacts';

describe('Contacts', () => {
  test('Given valid user data, it renders the Contacts component correctly', () => {
    const user = {
      username: 'John_Doe',
      id: 1
    };
    render(<Contacts user={user} />);

    const headingElement = screen.getByText('Контакти');
    expect(headingElement).toBeInTheDocument();
    const contactsCardElement = screen.getByTestId('contacts-card');
    expect(contactsCardElement).toBeInTheDocument();
  });
  
});