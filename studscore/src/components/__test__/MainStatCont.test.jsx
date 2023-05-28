import React from 'react';
import { render } from '@testing-library/react';
import MainStatCont from '../MainStat/MainStatCont';


describe('MainStatCont', () => {
  test('Given a title and data of MainStatCont, should render title and data correctly', () => {
    const title = 'Test Title';
    const data = 'Test Data';

    const { getByText } = render(<MainStatCont title={title} data={data} />);

    const titleElement = getByText(title);
    const dataElement = getByText(data);

    expect(titleElement).toBeInTheDocument();
    expect(dataElement).toBeInTheDocument();
  });

  test('Given the title "Місце на потоці", should apply additional class "wr2"', () => {
    const title = 'Місце на потоці';
    const data = 'Test Data';

    const { container } = render(<MainStatCont title={title} data={data} />);

    const placeWrapElement = container.querySelector('.place-wrap');

    expect(placeWrapElement).toHaveClass('wr2');
  });
});
