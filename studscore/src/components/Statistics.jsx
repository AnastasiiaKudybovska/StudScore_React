import React from 'react';
import './style.scss';
import MainStat from './MainStat/MainStat';
import MotivationBlock from './MotivationBlock';
import MyChart from './MainStat/MyChart';

const Statistics = () => {
  return (
    <>
    {/* <Navbar/> */}
    <MainStat/>
    <MotivationBlock initialText="Always be" phrases={["creative", "learning", 'coding']} />
    {/* <MotivationBlock initialText="Always be" phrases={["motivated", "productive", "creative", "learning", 'coding']} /> */}
    <MyChart/>
    
    </>
  );
};

export default Statistics;