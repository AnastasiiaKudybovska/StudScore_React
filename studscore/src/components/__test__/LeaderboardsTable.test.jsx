import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import AxiosClient from '../AxiosClient';
import LeaderboardTable from '../MainStat/LeaderboardTable';
jest.mock('../AxiosClient');


describe('LeaderboardTable', () => {
  
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
  
  const user = {
    id: 1,
    username: 'artem_honcharenko',
  };
  test('Given leaderboard data, should render data correctly', async () => {
    AxiosClient.get.mockResolvedValue({ status: 200, data: mockData }); 
    const { getByText } = render(<LeaderboardTable group_id={1} 
      user={user} 
      setMyRatMark='5.0' 
      setMyAverageMark='98.561' 
      leaderboardGroupData={mockData}/>);

    await waitFor(() => {
      expect(getByText('Шевченко Олексій')).toBeInTheDocument();
      expect(getByText('95.833')).toBeInTheDocument();

      const studentNameElement = screen.getByText('Гончаренко Артем');
      expect(studentNameElement).toBeInTheDocument();
      expect(studentNameElement).toHaveClass('fw-bold');
    });
  });

  test('Given average mark and rating mark, should render correctly', async () => {
    AxiosClient.get.mockResolvedValue({ status: 200, data: mockData }); 
    const mockData2 = [
      {
        average_mark: 0,
        rating_mark: 0,
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
      }]
    const { getByText } = render(<LeaderboardTable group_id={1} 
      user={user} 
      setMyRatMark='0' 
      setMyAverageMark='0' 
      leaderboardGroupData={mockData2}/>);
      await waitFor(() => {
        expect(getByText('0.0')).toBeInTheDocument();
        expect(getByText('0.000')).toBeInTheDocument();  
      });
  });

  test('Should fetch stream rating data when "stream" button is clicked', async () => {
    AxiosClient.get.mockResolvedValue({status : 200, data: mockData }); 
    const { getByText } = render(<LeaderboardTable group_id={1} 
      user={user} 
      setMyRatMark='5.0' 
      setMyAverageMark='98.561' 
      leaderboardGroupData={mockData}/>); 
    const streamButton = screen.getByText('Потік');
    fireEvent.click(streamButton);
    
    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith('/students/rating');
    });
  });

  test('Should fetch stream rating data when "stream" button is clicked', async () => {
    AxiosClient.get.mockResolvedValue({status : 200, data: mockData }); 
    const { getByText } = render(<LeaderboardTable group_id={1} 
      user={user} 
      setMyRatMark='5.0' 
      setMyAverageMark='98.561' 
      leaderboardGroupData={mockData}/>); 
    
    const groupButton = screen.getByText('Група');
    fireEvent.click(groupButton);
    
    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith(`/students/groups/1/rating`);
    });
  });

  test('Given error when fetching stream rating data, should handle error', async () => {
    const errorMessage = 'Error message';
    const errorResponse = { status: 404, response: { status: 404, data: { error: { message: errorMessage } } } };
    AxiosClient.get.mockRejectedValue(errorResponse);
    const consoleSpy = jest.spyOn(console, 'log');
    render(<LeaderboardTable
      group_id='1'
      user={{ id: '1' }}
      setMyRatMark='98.784'
      setMyAverageMark='98.561'
      leaderboardGroupData={mockData} />);
      
    const streamButton = screen.getByText('Потік');
    fireEvent.click(streamButton);
  
    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith('/students/rating');
      expect(consoleSpy).toHaveBeenCalledWith(errorResponse); 
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('Given error when fetching group rating data, should handle error', async () => {
    const errorMessage = 'Error message';
    const errorResponse = { status: 404, response: { status: 404, data: { error: { message: errorMessage } } } };
    AxiosClient.get.mockRejectedValue(errorResponse);
    const consoleSpy = jest.spyOn(console, 'log');
    render(<LeaderboardTable
      group_id='1'
      user={{ id: '1' }}
      setMyRatMark='98.784'
      setMyAverageMark='98.561'
      leaderboardGroupData={mockData} />);
      
    const groupButton = screen.getByText('Група');
    fireEvent.click(groupButton);
  
    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith(`/students/groups/1/rating`);
      expect(consoleSpy).toHaveBeenCalledWith(errorResponse); 
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('Should sets group_id to null when props.group_id is not provided', () => {
    AxiosClient.get.mockResolvedValue({ status: 200, data: mockData }); 
    render(<LeaderboardTable group_id={null} 
      user={user} 
      setMyRatMark='5.0' 
      setMyAverageMark='98.561' 
      leaderboardGroupData={mockData}/>);
  });

  test('Should sets user to null when props.user is not provided', () => {
    AxiosClient.get.mockResolvedValue({ status: 200, data: mockData }); 
    render(<LeaderboardTable group_id={1} 
      user={null} 
      setMyRatMark='5.0' 
      setMyAverageMark='98.561' 
      leaderboardGroupData={mockData}/>);
  });

});
