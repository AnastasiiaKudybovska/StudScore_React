import React from 'react';
import { render, act } from '@testing-library/react';
import MotivationBlock from '../MotivationBlock';

describe('MotivationBlock', () => {
  const phrases = ['Phrase 1', 'Phrase 2', 'Phrase 3'];
  const initialText = 'Initial Text';

  test('Given correct data, should render without errors', () => {
    render(<MotivationBlock phrases={phrases} initialText={initialText} />);
  });

  test('Given initial text and phrases, should display initial text', () => {
    const { getByText } = render(<MotivationBlock phrases={phrases} initialText={initialText} />);
    expect(getByText(initialText)).toBeInTheDocument();
  });

  test('Given multiple phrases, should toggle phrases at intervals', () => {
    jest.useFakeTimers();
    const { getByText } = render(<MotivationBlock phrases={phrases} initialText={initialText} />);
    expect(getByText(phrases[0])).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
   
    expect(getByText(phrases[1])).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(getByText(phrases[2])).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
   
    expect(getByText(phrases[0])).toBeInTheDocument();

    jest.useRealTimers();
  });  
  
});
