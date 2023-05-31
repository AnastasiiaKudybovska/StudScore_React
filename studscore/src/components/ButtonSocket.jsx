/* istanbul ignore file */

import React, { useState, useEffect } from 'react';
import tridentImg from './images/trident.png';
export const ButtonSocket = () => {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState(null);

  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setSocket(socket);
    socket.onmessage = ('countUpdate', (newCount) => {
      setCount(parseInt(newCount.data));
    //   console.log(newCount);
    });  
    return () => {
      socket.close();
    };
  }, []);

  const handleClick = () => {
    socket.send(JSON.stringify({"action": 'increment_donation', "count": ''+(count + 1)}));
    setCount(count + 1);


    window.open('https://savelife.in.ua/donate/#donate-army-card-monthly', '_blank');
  };
 
  return (
    <div className='contacts-card2'>
      <div className="contacts-card">
        
        <div className='donation-cont'>   
            <div className='donation-info'>
                 <h4 className='h2-place'>Підтримай Збройні Сили України</h4>
                <p>Підтримай ЗСУ, щоб наблизити нашу Перемогу!</p>
                <button className='donation-butt login-btn' onClick={handleClick}>Підтримати</button>
                <p className='fw-bold'>Вже підтримало: {count}</p>
            </div>
            <div>
               <img className='donation-img' src={tridentImg} alt="trident"/>
            </div>
            {/* <button className='donation-butt login-btn' onClick={handleClick2}>{answer ? 'Героям Слава!' : 'Слава Україні!'}</button> */}
        </div>
      
      </div>
    </div>
  );
};