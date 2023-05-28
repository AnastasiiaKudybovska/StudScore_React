import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from '../Statistics';


describe('Statistics component', () => {
    const user = {
        id: 1,
        username: 'testuser',
    };
    test('Given correct data, it should render MainStat, Motivation-block, MyChart components', () => {
      render(<Statistics user={user} />);
      expect(screen.getByTestId('main-stat')).toBeInTheDocument();
      expect(screen.getByTestId('motivation-block')).toBeInTheDocument();
    });
  
  });