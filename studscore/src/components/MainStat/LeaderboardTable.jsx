import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FaGem} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';

const LeaderboardTable = (props) => {

  const [activeButton, setActiveButton] = useState('group');
  const group_id = props.group_id ? props.group_id : null;
  const user = props.user ? props.user : null;

  const [leaderboardData, setLeaderboardData] = useState([]);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  useEffect(() => {
    setLeaderboardData(props.leaderboardGroupData)
  }, [props.leaderboardGroupData]);


  // useEffect(() => {
  //   async function getGroupRating() {    
  //     if (group_id && user && user.id) {
  //       return AxiosClient.get(`/students/groups/${group_id}/rating`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setLeaderboardData(response.data);
  //           response.data.forEach((item) => {
  //             if (item.student.user.id_user === user.id) {
  //               props.setMyRatMark(item.rating_mark);
  //               props.setMyAverageMark(item.average_mark);
  //             }
  //           });
  //           // console.log(response.data) 
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setAlertMessage(error.response.data.error.message);
  //         setAlertSuccess(false);
  //         setAlertKey(alertKey + 1);
  //       })
  //   }
  // }
  //   getGroupRating();
  // }, [group_id, user,  props.setMyAverageMark, props.setLoadingArray]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'group') {
      AxiosClient.get(`/students/groups/${group_id}/rating`)
      .then(response => {
        setLeaderboardData(response.data);
      })
      .catch(error => {
        console.log(error);
        setAlertMessage(error.response.data.error.message);
        setAlertSuccess(false);
        setAlertKey(alertKey + 1);
      });
    } else if (button === 'stream') {
      AxiosClient.get('/students/rating')
      .then(response => {
        setLeaderboardData(response.data);
      })
      .catch(error => {
        console.log(error);
         setAlertMessage(error.response.data.error.message);
          setAlertSuccess(false);
          setAlertKey(alertKey + 1);
      });
    }
  };
  
  return (
    <div>
        <div>
          <div className="rat-title-cont">
            <h2 className="h2-place">Таблиця лідерів</h2>
            <div className="button-block">
              <button
                className={activeButton === "group" ? "active" : ""}
                data-target="#group-rating"
                id="btn-group"
                onClick={() => handleButtonClick("group")}
              >Група</button>
              <button
                className={activeButton === "stream" ? "active" : ""}
                data-target="#stream-rating"
                id="btn-stream"
                onClick={() => handleButtonClick("stream")}
              >Потік</button>
            </div>
          </div>
          <hr />
          <div className="stud-rat rating active" id="group-rating">
            <ol>
            {leaderboardData && user && leaderboardData.map((item) =>  (
                <div className="self-stud-rat" key={item.student.user.id_user}>
                  <li className={item.student.user.id_user === user.id ? "fw-bold" : ""}>
                    {item.student.user.last_name} {item.student.user.first_name}
                  </li>
                  <div className="mark-div">
                    <div className={
                        item.student.user.id_user === user.id
                          ? "rating_mark_in_r  rating-mark-block3"
                          : "rating_mark_in_r  rating-mark-block0"
                      }>
                      <p>{item.average_mark !== 0 ? item.average_mark : "0.0"}</p>
                      <FaGem className="fa fa-gem" />
                    </div>
                    <div className={ 
                        item.student.user.id_user === user.id
                          ? "rating_mark_in_r  rating-mark-block2"
                          : "rating_mark_in_r  rating-mark-block0"
                      }>
                      <p> {item.rating_mark !== 0 ? item.rating_mark : "0.000"} </p>
                      <AiFillStar className="fa fa-star" />
                      {/* <FontAwesomeIcon icon={faStar} className="fa fa-star" aria-hidden="true"  /> */}
                    </div>
                  </div>
                </div>
              ))}
            </ol>
          </div>
        </div>
      {/* )} */}
      {alertMessage && (
        <CustomAlert key={alertKey} message={alertMessage} success={alertSuccess} />
      )}
    </div>
  );
      }
  
export default LeaderboardTable;



    // { id: 1, last_name: 'Гончаренко', first_name: 'Артем', average_mark: 5.0, rating_mark: 97.933 },
    // { id: 2, last_name: 'Шевченко', first_name: 'Олексій', average_mark: 5.0, rating_mark: 95.833},
    // { id: 3, last_name: 'Кудибовська', first_name: 'Анастасія', average_mark: 4.8, rating_mark: 92.975},
    // { id: 4, last_name: 'Павлюк', first_name: 'Юлія', average_mark: 4.8, rating_mark: 89.046},
    // { id: 5, last_name: 'Мельник', first_name: 'Сергій', average_mark: 5.0, rating_mark: 88.982},
    // { id: 6, last_name: 'Ковальчук', first_name: 'Владислав', average_mark: 4.8, rating_mark: 87.652},
    // { id: 7, last_name: 'Козак', first_name: 'Вікторія', average_mark: 4.5, rating_mark: 82.975},
    // { id: 8, last_name: 'Горбачук', first_name: 'Марія', average_mark: 4.3, rating_mark: 81.425},
    // { id: 9, last_name: 'Іваненко', first_name: 'Андрій', average_mark: 4.3, rating_mark: 81.425},
    // { id: 11, last_name: 'Денисенко', first_name: 'Катерина', average_mark: 4.3, rating_mark: 81.425},
    // { id: 12, last_name: 'Олійник', first_name: 'Олег', average_mark: 4.3, rating_mark: 81.425},
    // { id: 13, last_name: 'Савченко', first_name: 'Володимир', average_mark: 4.3, rating_mark: 81.425},
    // { id: 14, last_name: 'Ткачук', first_name: 'Надія', average_mark: 4.3, rating_mark: 81.425},
    // { id: 15, last_name: 'Григоренко', first_name: 'Іван', average_mark: 4.3, rating_mark: 81.425},
    // { id: 16, last_name: 'Данилюк', first_name: 'Ігор', average_mark: 4.3, rating_mark: 81.425},
    // { id: 17, last_name: 'Романенко', first_name: 'Юлія', average_mark: 4.3, rating_mark: 81.425},
    // { id: 18, last_name: 'Ганенко ', first_name: 'Аліна', average_mark: 4.3, rating_mark: 81.425},

