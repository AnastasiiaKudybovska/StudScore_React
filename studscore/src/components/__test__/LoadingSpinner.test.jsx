import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../Loading/LoadingSpinner';

describe('LoadingSpinner', () => {
  
    test('Should renders the loading spinner component', () => {
      const { getByTestId } = render(<LoadingSpinner />);    
      const spinnerElement = getByTestId('loader-circle');
      expect(spinnerElement).toBeInTheDocument();
    });
})