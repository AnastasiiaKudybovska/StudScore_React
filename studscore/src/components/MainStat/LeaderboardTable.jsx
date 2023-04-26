import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FaGem} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
const LeaderboardTable = () => {
  const [activeButton, setActiveButton] = useState('group');
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, last_name: 'Гончаренко', first_name: 'Артем', average_mark: 5.0, rating_mark: 97.933 },
    { id: 2, last_name: 'Шевченко', first_name: 'Олексій', average_mark: 5.0, rating_mark: 95.833},
    { id: 3, last_name: 'Кудибовська', first_name: 'Анастасія', average_mark: 4.8, rating_mark: 92.975},
    { id: 4, last_name: 'Павлюк', first_name: 'Юлія', average_mark: 4.8, rating_mark: 89.046},
    { id: 5, last_name: 'Мельник', first_name: 'Сергій', average_mark: 5.0, rating_mark: 88.982},
    { id: 6, last_name: 'Ковальчук', first_name: 'Владислав', average_mark: 4.8, rating_mark: 87.652},
    { id: 7, last_name: 'Козак', first_name: 'Вікторія', average_mark: 4.5, rating_mark: 82.975},
    { id: 8, last_name: 'Горбачук', first_name: 'Марія', average_mark: 4.3, rating_mark: 81.425},
    { id: 9, last_name: 'Іваненко', first_name: 'Андрій', average_mark: 4.3, rating_mark: 81.425},
    { id: 11, last_name: 'Денисенко', first_name: 'Катерина', average_mark: 4.3, rating_mark: 81.425},
    { id: 12, last_name: 'Олійник', first_name: 'Олег', average_mark: 4.3, rating_mark: 81.425},
    { id: 13, last_name: 'Савченко', first_name: 'Володимир', average_mark: 4.3, rating_mark: 81.425},
    { id: 14, last_name: 'Ткачук', first_name: 'Надія', average_mark: 4.3, rating_mark: 81.425},
    { id: 15, last_name: 'Григоренко', first_name: 'Іван', average_mark: 4.3, rating_mark: 81.425},
    { id: 16, last_name: 'Данилюк', first_name: 'Ігор', average_mark: 4.3, rating_mark: 81.425},
    { id: 17, last_name: 'Романенко', first_name: 'Юлія', average_mark: 4.3, rating_mark: 81.425},
    { id: 18, last_name: 'Ганенко ', first_name: 'Аліна', average_mark: 4.3, rating_mark: 81.425},
  ]);
  
  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'group') {
      setLeaderboardData([
        { id: 1, last_name: 'Гончаренко', first_name: 'Артем', average_mark: 5.0, rating_mark: 97.933 },
        { id: 2, last_name: 'Шевченко', first_name: 'Олексій', average_mark: 5.0, rating_mark: 95.833},
        { id: 3, last_name: 'Кудибовська', first_name: 'Анастасія', average_mark: 4.8, rating_mark: 92.975},
        { id: 4, last_name: 'Павлюк', first_name: 'Юлія', average_mark: 4.8, rating_mark: 89.046},
        { id: 5, last_name: 'Мельник', first_name: 'Сергій', average_mark: 5.0, rating_mark: 88.982},
        { id: 6, last_name: 'Ковальчук', first_name: 'Владислав', average_mark: 4.8, rating_mark: 87.652},
        { id: 7, last_name: 'Козак', first_name: 'Вікторія', average_mark: 4.5, rating_mark: 82.975},
        { id: 8, last_name: 'Горбачук', first_name: 'Марія', average_mark: 4.3, rating_mark: 81.425},
        { id: 9, last_name: 'Іваненко', first_name: 'Андрій', average_mark: 4.3, rating_mark: 81.425},
        { id: 11, last_name: 'Денисенко', first_name: 'Катерина', average_mark: 4.3, rating_mark: 81.425},
        { id: 12, last_name: 'Олійник', first_name: 'Олег', average_mark: 4.3, rating_mark: 81.425},
        { id: 13, last_name: 'Савченко', first_name: 'Володимир', average_mark: 4.3, rating_mark: 81.425},
        { id: 14, last_name: 'Ткачук', first_name: 'Надія', average_mark: 4.3, rating_mark: 81.425},
        { id: 15, last_name: 'Григоренко', first_name: 'Іван', average_mark: 4.3, rating_mark: 81.425},
        { id: 16, last_name: 'Данилюк', first_name: 'Ігор', average_mark: 4.3, rating_mark: 81.425},
        { id: 17, last_name: 'Романенко', first_name: 'Юлія', average_mark: 4.3, rating_mark: 81.425},
        { id: 18, last_name: 'Ганенко ', first_name: 'Аліна', average_mark: 4.3, rating_mark: 81.425},
      ]);
    } else if (button === 'stream') {
      setLeaderboardData([
        { id: 1, last_name: 'Гончаренко', first_name: 'Артем', average_mark: 5.0, rating_mark: 97.933 },
        { id: 2, last_name: 'Шевченко', first_name: 'Олексій', average_mark: 5.0, rating_mark: 95.833},
        { id: 4, last_name: 'Павлюк', first_name: 'Юлія', average_mark: 4.8, rating_mark: 94.046},
        { id: 5, last_name: 'Мельник', first_name: 'Сергій', average_mark: 5.0, rating_mark: 93.982},
        { id: 3, last_name: 'Кудибовська', first_name: 'Анастасія', average_mark: 4.8, rating_mark: 92.975},
        { id: 6, last_name: 'Ковальчук', first_name: 'Владислав', average_mark: 4.8, rating_mark: 87.652},
        { id: 7, last_name: 'Козак', first_name: 'Вікторія', average_mark: 4.5, rating_mark: 82.975},
        { id: 8, last_name: 'Горбачук', first_name: 'Марія', average_mark: 4.3, rating_mark: 81.425},
        { id: 9, last_name: 'Іваненко', first_name: 'Андрій', average_mark: 4.3, rating_mark: 81.425},
        { id: 11, last_name: 'Денисенко', first_name: 'Катерина', average_mark: 4.3, rating_mark: 81.425},
        { id: 12, last_name: 'Олійник', first_name: 'Олег', average_mark: 4.3, rating_mark: 81.425},
        { id: 13, last_name: 'Савченко', first_name: 'Володимир', average_mark: 4.3, rating_mark: 81.425},
        { id: 14, last_name: 'Ткачук', first_name: 'Надія', average_mark: 4.3, rating_mark: 81.425},
        { id: 15, last_name: 'Григоренко', first_name: 'Іван', average_mark: 4.3, rating_mark: 81.425},
        { id: 16, last_name: 'Данилюк', first_name: 'Ігор', average_mark: 4.3, rating_mark: 81.425},
        { id: 17, last_name: 'Романенко', first_name: 'Юлія', average_mark: 4.3, rating_mark: 81.425},
        { id: 18, last_name: 'Ганенко ', first_name: 'Аліна', average_mark: 4.3, rating_mark: 81.425},
      ]);
    }
  };
  
  return (
    <div>
        <div className="rat-title-cont">
            <h2 className="h2-place">Таблиця лідерів</h2>
            <div className="button-block">
                <button className={activeButton === 'group' ? 'active' : ''} data-target="#group-rating" id="btn-group"  onClick={() => handleButtonClick('group')}>Група</button>
                <button className={activeButton === 'stream' ? 'active' : ''} data-target="#stream-rating" id="btn-stream" onClick={() => handleButtonClick('stream')} >Потік</button>
            </div>
        </div>
        <hr/>
        <div className="stud-rat rating active" id="group-rating">
            <ol>
            {leaderboardData.map((item) => (
                <div className="self-stud-rat" key={item.id}>
                <li className={item.id === 3 ? 'fw-bold' : ''}>{item.last_name} {item.first_name}</li>
                <div className="mark-div">
                    <div className={item.id === 3 ? 'rating_mark_in_r  rating-mark-block3' : 'rating_mark_in_r  rating-mark-block0'}>
                    <p>{item.average_mark !== 0 ?item.average_mark.toFixed(1): '0.0'} </p>
                    <FaGem className="fa fa-gem"/>  
                    </div>     
                    <div className={item.id === 3 ? 'rating_mark_in_r  rating-mark-block2' : 'rating_mark_in_r  rating-mark-block0'}>
                    <p>{item.rating_mark !== 0 ? item.rating_mark : '0.000'}</p>  
                    <AiFillStar className="fa fa-star"/>
                    {/* <FontAwesomeIcon icon={faStar} className="fa fa-star" aria-hidden="true"  /> */}
                    </div>
                </div>    
                </div>
            ))}
            </ol>
        </div>
    </div>
  );
};

export default LeaderboardTable;
