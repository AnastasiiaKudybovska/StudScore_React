import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { parseJwt } from '../jwtUtils';


describe('App', () => {
  test('Should render the login form', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    );
    await waitFor(() => {
      const loginForm = screen.getByTestId('login-testid');
      expect(loginForm).toBeInTheDocument();
    });
  });
  test('Should return parsed payload when a valid token is provided', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJwYXNzd29yZCI6IiQyYiQxMiR6TXFVM25oOVBzTzNvVzVGT3JneDB1eW1PNGwyQVJqMERsRDUuOVV1Z29DZHVRLnh3WDFQbSIsInVzZXJuYW1lIjoiYW5hc3Rhc2lpYV9rdWR5Ym92c2thIn0.iZdpAdBua9AUkSaIF3rmzq9BneFkkVSPz_DOPLGM39U';

    const result = parseJwt(token);

    expect(result).toEqual({
      id_user: 1,
      username: 'anastasiia_kudybovska',
      password: "$2b$12$zMqU3nh9PsO3oW5FOrgx0uymO4l2ARj0DlD5.9UugoCduQ.xwX1Pm",
    });
  });

  test('Should return undefined when the token is empty', () => {
    const token = '';
    const result = parseJwt(token);
    expect(result).toBeUndefined();
  });


});
