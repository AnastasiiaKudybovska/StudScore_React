import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const showAlertAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AlertWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 20px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  background-color: ${(props) => (props.success ? '#23b86b' : '#b7094c')}; //#23b86b 23b87d
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  animation: ${showAlertAnimation} 0.2s ease-in-out forwards;
  font-family:  'Lora', serif;
`;

const TimerWrapper = styled.div`
  height: 5px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 10px;
  width: ${(props) => props.width};
  transition: width 0.2s ease-in-out; 
`;

const CustomAlert = ({ message, success }) => {
  const [visible, setVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(95);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 50);
    setTimeout(() => {
      clearInterval(intervalId);
      setVisible(false);
      setSecondsLeft(95);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const timerWidth = `${secondsLeft}%`;

  return (
    <>
      {visible && (
        <AlertWrapper success={success}>
          {message}
          <TimerWrapper width={timerWidth} />
        </AlertWrapper>
      )}
    </>
  );
};

export default CustomAlert;
