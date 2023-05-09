import React, { useEffect, useState } from 'react';
import './style.scss';
import MainStat from './MainStat/MainStat';
import MotivationBlock from './MotivationBlock';
import MyChart from './MainStat/MyChart';

const Statistics = (props) => {

  const [myRatMark, setMyRatMark] = useState(null);
  const [myAverageMark, setMyAverageMark] = useState(null);

  return (
    <>
    <MainStat user={props.user} setMyRatMark={setMyRatMark} setMyAverageMark={setMyAverageMark}/>
    <MotivationBlock initialText="Always be" phrases={["creative", "learning", 'coding']} />
    {/* <MotivationBlock initialText="Always be" phrases={["motivated", "productive", "creative", "learning", 'coding']} /> */}
    <MyChart myRatMark={myRatMark} myAverageMark={myAverageMark} user={props.user}/>
    
    </>
  );
};

export default Statistics;