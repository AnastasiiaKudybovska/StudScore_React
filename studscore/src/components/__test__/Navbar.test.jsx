import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AxiosClient from '../AxiosClient';
import { act } from 'react-dom/test-utils';

jest.mock('../AxiosClient', () => ({
    get: jest.fn(),
  }));
  
describe('Navbar component', () => {
    // beforeEach(() => {
    //     AxiosClient.get.mockClear();
        
    //   });
      beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'clear');
      });
      
    test('Should renders Navbar component', () => {
      render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      );
      const logoText = screen.getByText('StudScore');
      const statisticsLink = screen.getByText('Статистика');
      const profileLink = screen.getByText('Профіль');
      const contactsLink = screen.getByText('Контакти');
      const logoutLink = screen.getByText('Вийти');
  
      expect(logoText).toBeInTheDocument();
      expect(statisticsLink).toBeInTheDocument();
      expect(profileLink).toBeInTheDocument();
      expect(contactsLink).toBeInTheDocument();
      expect(logoutLink).toBeInTheDocument();
    });
  
    test('Should toggles menu on menu icon click', () => {
        render(
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
            );
      const sideMenu = screen.getByTestId('side-menu');
      const menuIcon = screen.getByTestId('menu-icon');
      expect(sideMenu.checked).toBe(false);
      fireEvent.click(menuIcon);
      expect(sideMenu.checked).toBe(true);
    });

    test('Should fetch user info and rating mark', async () => {
        const mockUser = {
          username: 'testuser',
        };
        const mockUserInfo = {
          first_name: 'testFirstName',
          last_name: 'testLastName',
        };
        const mockUserRatingMark = 4;
    
        AxiosClient.get.mockResolvedValueOnce({ status: 200, data: mockUserInfo });
        AxiosClient.get.mockResolvedValueOnce({ status: 200, data: mockUserRatingMark });
    
        render(
        <BrowserRouter>
            <Navbar user={mockUser} isUpdatedUser={false} />
        </BrowserRouter>
        );

        // const textMatcher = (content, element) => {
        //     const elementText = element.textContent.replace(/\s/g, ''); // Remove whitespace
        //     const searchText = content.replace(/\s/g, ''); // Remove whitespace
        //     return elementText === searchText;
        //   };

        expect(AxiosClient.get).toHaveBeenCalledTimes(2);
        expect(AxiosClient.get).toHaveBeenCalledWith('/user/testuser');
        expect(AxiosClient.get).toHaveBeenCalledWith('/students/testuser/rating');
    
        await act(async () => {
          await AxiosClient.get.mock.results[0].value;
          await AxiosClient.get.mock.results[1].value;
        });
    
        await waitFor(() => {
            // expect(screen.getByText('testFirstName', { matcher: textMatcher })).toBeInTheDocument();
            expect(screen.getByText('4')).toBeInTheDocument();
          });

          jest.clearAllMocks();
      });
      
      test('Given failed rating matk fetch, it should display an error message', async () => {
        const mockUser = {
          username: 'testuser',
        };
        const mockUserInfo = {
          first_name: 'testFirstName',
          last_name: 'testLastName',
        };
        const mockUserRatingMark = 4;
      
        AxiosClient.get
          .mockResolvedValueOnce({ status: 200, data: mockUserInfo })
          .mockRejectedValueOnce({ 
            status: 404, 
            response: {
              status: 404,
                data: {
                 error: {
                    code: 404,
                      message: 'Not found'
                  }
                }
            } }
            );
      
        render(
          <BrowserRouter>
            <Navbar user={mockUser} isUpdatedUser={false} />
          </BrowserRouter>
        );
        expect(AxiosClient.get).toHaveBeenCalledTimes(2);
        expect(AxiosClient.get).toHaveBeenCalledWith('/user/testuser');
        expect(AxiosClient.get).toHaveBeenCalledWith('/students/testuser/rating');
      
        await act(async () => {
          await AxiosClient.get.mock.results[0].value;
          await AxiosClient.get.mock.results[1].value.catch(() => {});
        });
      
        await waitFor(() => {
          expect(screen.getByText('Not found')).toBeInTheDocument();
        });
      });
    
      test('Given failed user data fetch, it should display an error message', async () => {
        const mockUser = {
          username: 'testuser',
        };
      
        AxiosClient.get.mockRejectedValue({
          response: {
            status: 404,
            data: {
              error: {
                code: 404,
                message: 'Not found',
              },
            },
          },
        });
      
        render(
          <BrowserRouter>
            <Navbar user={mockUser} isUpdatedUser={false} />
          </BrowserRouter>
        );
      
        expect(AxiosClient.get).toHaveBeenCalledWith('/user/testuser');
      
        await act(async () => {
          await AxiosClient.get.mock.results[0].value.catch(() => {});
        });
      
        await waitFor(() => {
          const errorElement = screen.getByText('Not found');
          expect(errorElement).toBeInTheDocument();
        });
      
        jest.clearAllMocks();
      });

      test('Should call localStorage.clear(), when logout link is clicked', async () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
          );
         const sideMenu = screen.getByTestId('side-menu');
         const menuIcon = screen.getByTestId('menu-icon');
         expect(sideMenu.checked).toBe(false);
         fireEvent.click(menuIcon);
        expect(sideMenu.checked).toBe(true);
        const logoutLink = screen.getByText('Вийти');
        fireEvent.click(logoutLink);
        expect(localStorage.clear).toHaveBeenCalledTimes(1);
      });
    
  });