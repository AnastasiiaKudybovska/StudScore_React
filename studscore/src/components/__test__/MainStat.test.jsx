import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MainStat from '../MainStat/MainStat';
import AxiosClient from '../AxiosClient';
jest.mock('../AxiosClient');

describe('MainStat', () => {

  test('Given isLoading is true, should display loader', () => {
    render(<MainStat />);
    expect(screen.getByTestId('loader-circle')).toBeInTheDocument();
  });

  const user = {
    id: 1,
    username: 'testuser',
  };

  const mockData = [
    {
      average_mark: "5.0",
      rating_mark: "98.561",
      student: {
        date_of_birthday: "2004-06-01",
        date_of_entry: "2021-09-11",
        date_of_graduation: "2026-06-30",
        group: { id_group: 1, name: 'КН-215' },
        user: {
          email: "artemhoncharenko@gmail.com",
          first_name: "Артем",
          id_user: 1,
          last_name: "Гончаренко",
          phone: "380732221292",
          username: "artem_honcharenko"
        }
      }
    },
    {
      average_mark: "5.0",
      rating_mark: "95.833",
      student: {
        date_of_birthday: "2000-12-05",
        date_of_entry: "2019-09-01",
        date_of_graduation: "2024-06-30",
        group: { id_group: 2, name: 'КН-216' },
        user: {
          email: "oleksiy.shevchenko@gmail.com",
          first_name: "Олексій",
          id_user: 8,
          last_name: "Шевченко",
          phone: "380982223344",
          username: "oleksiy_shevchenko"
        }
      }
    },
    {
      average_mark: "4.8",
      rating_mark: "92.975",
      student: {
        date_of_birthday: "2003-03-15",
        date_of_entry: "2020-09-01",
        date_of_graduation: "2025-06-30",
        group: { id_group: 1, name: 'КН-215' },
        user: {
          email: "anastasiya.kudybovska@gmail.com",
          first_name: "Анастасія",
          id_user: 9,
          last_name: "Кудибовська",
          phone: "380732221299",
          username: "anastasiya_kudybovska"
        }
      }
    },
  ];

  test('Given user data and mock API response, should render main statistics correctly', async() => {
    const setMyRatMark = jest.fn();
    const setMyAverageMark = jest.fn();
    AxiosClient.get.mockResolvedValueOnce({ status: 200, data: '1' });
    AxiosClient.get.mockResolvedValueOnce({ status: 200, data: '2' });
    AxiosClient.get.mockResolvedValueOnce({ status: 200, data: '3' });
    AxiosClient.get.mockResolvedValue({status : 200, data: mockData }); 
    const { getByText } = render(
      <MainStat user={user} setMyRatMark={setMyRatMark} setMyAverageMark={setMyAverageMark} />
    );
    await waitFor(() => {
    const placeInGroupElement = getByText('Місце у групі');
    const placeInStreamElement = getByText('Місце на потоці');

    expect(placeInGroupElement).toBeInTheDocument();
    expect(placeInStreamElement).toBeInTheDocument();
    });
  });  
  

});
