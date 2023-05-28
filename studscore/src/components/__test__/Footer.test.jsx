import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';


describe('Footer', () => {
    test('Should renders footer component', () => {
        render(
          <BrowserRouter>
            <Footer />
          </BrowserRouter>
        );
      });
      
      test('Given footer component, it should renders logo text', () => {
        const { getAllByText } = render(
          <BrowserRouter>
            <Footer />
          </BrowserRouter>
        );
        const logoText = getAllByText(/StudScore/i);
        expect(logoText[0]).toBeInTheDocument();
      });
      
      test('Given footer component, it should renders footer links', () => {
        const { getByText } = render(
          <BrowserRouter>
            <Footer />
          </BrowserRouter>
        );
        const statisticsLink = getByText(/Статистика/i);
        const profileLink = getByText(/Профіль/i);
        const contactsLink = getByText(/Контакти/i);
      
        expect(statisticsLink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();
        expect(contactsLink).toBeInTheDocument();
      });

      
});
