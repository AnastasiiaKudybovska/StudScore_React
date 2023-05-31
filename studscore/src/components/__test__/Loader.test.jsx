import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../Loading/Loader';

describe('Loader', () => {
  test('Should renders the loader component', () => {
    render(<Loader />);
    expect(screen.queryByText('Завантаження')).toBeInTheDocument();
    expect(screen.getByTestId('loader-circle')).toBeInTheDocument();
    expect(screen.getByTestId('rotating-gem')).toBeInTheDocument()
    expect(screen.getByAltText('image')).toBeInTheDocument();
  });
});
