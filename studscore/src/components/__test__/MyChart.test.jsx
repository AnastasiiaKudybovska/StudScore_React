import React from 'react';
import { render, screen, act, waitFor} from '@testing-library/react';
import MyChart from '../MainStat/MyChart';
import AxiosClient from '../AxiosClient';

jest.mock('../AxiosClient');

describe('MyChart', () => {
  const mockUser = {
    user_id: 1,
    username: 'testuser',
  };

  const mockMarks = [
    {
      date: '2023-03-22',
      id_mark: 1,
      mark: 5,
      student: {
        date_of_birthday: '2003-10-10',
        date_of_entry: '2021-09-11',
        date_of_graduation: '2026-06-30',
        user: {
          id_user: 1,
          first_name: 'John',
          last_name: 'Doe',
          username: 'testuser',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
      },
      subject: {
        credits: 5,
        id_subject: 1,
        name: 'Веб-технології та веб-дизайн',
      },
      teacher: {
        date_of_employment: '2013-09-01',
        qualification: 'Кандидат технічних наук',
        user: {
          id_user: 2,
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
      },
    },
  ];

  beforeAll(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Given valid user data, it should render the chart components', async () => {
    jest.spyOn(AxiosClient, 'get').mockResolvedValue({ status: 200, data: mockMarks });
    render(<MyChart user={mockUser} myRatMark={90.875} myAverageMark={5.0} />);

    await screen.findByTestId('my-chart');

    expect(screen.getByTestId('my-chart1')).toBeInTheDocument();
    expect(screen.getByTestId('my-chart2')).toBeInTheDocument();
    expect(screen.getByTestId('my-chart3')).toBeInTheDocument();
  });

  test('Given valid user data, ratmark and average, it should display the average mark', async () => {
    jest.spyOn(AxiosClient, 'get').mockResolvedValue({ status: 200, data: mockMarks });
    render(<MyChart user={mockUser} myRatMark={90.875} myAverageMark={5.0} />);

    await screen.findByTestId('my-chart');

    expect(screen.getByText(/Середній бал/i)).toBeInTheDocument();
    expect(screen.getByText(/90.875/)).toBeInTheDocument();
  });

  test('Given null user data, it should render the chart components without user data', async () => {
    jest.spyOn(AxiosClient, 'get').mockResolvedValue({ status: 200, data: mockMarks });
    render(<MyChart user={null} myRatMark={90.875} myAverageMark={5.0} />);
  });

  // test('Given valid user data, it should fetch marks data and update state', async () => {
  //   const marksData = [
  //     {
  //       date: '2023-03-22',
  //       id_mark: 1,
  //       mark: 5,
  //       student: {
  //         date_of_birthday: '2003-10-10',
  //         date_of_entry: '2021-09-11',
  //         date_of_graduation: '2026-06-30',
  //         user: {
  //           id_user: 1,
  //           first_name: 'John',
  //           last_name: 'Doe',
  //           username: 'testuser',
  //           email: 'johndoe@example.com',
  //           phone: '1234567890',
  //         },
  //       },
  //       subject: {
  //         credits: 5,
  //         id_subject: 1,
  //         name: 'Веб-технології та веб-дизайн',
  //       },
  //       teacher: {
  //         date_of_employment: '2013-09-01',
  //         qualification: 'Кандидат технічних наук',
  //         user: {
  //           id_user: 2,
  //           first_name: 'John',
  //           last_name: 'Doe',
  //           username: 'johndoe',
  //           email: 'johndoe@example.com',
  //           phone: '1234567890',
  //         },
  //       },
  //     },
  //   ];

  //   AxiosClient.get.mockResolvedValue({ status: 200, data: marksData });

  //   let component;

  //   await act(async () => {
  //     component = render(<MyChart user={mockUser} />);
  //   });

  //   expect(AxiosClient.get).toHaveBeenCalledWith('/students/1/marks');
  //   const marksElement = await component.findByTestId('marks-data');
  //   marksData.forEach((mark) => {
  //     expect(marksElement).toHaveTextContent(mark.date);
  //     expect(marksElement).toHaveTextContent(mark.mark.toString());
  //   });
  // });
});


    
        

    