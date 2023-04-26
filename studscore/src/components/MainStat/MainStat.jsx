import React, { useEffect, useState } from 'react'
import './MainStat.scss'
import MainStatCont from './MainStatCont';
import LeaderboardTable from './LeaderboardTable';
import StudentMarks from './StudentMarks';
const MainStat = () => {
  const [placeInGroup, setPlaceInGroup] = useState("3");
  const [placeInStream, setPlaceInStream] = useState("5");

  return (
    <div className="mainStatWrapper">
        <div className="main-stat-wrap">
            <div className="main-stat-place-cont">
                <MainStatCont title="Місце у групі" data={placeInGroup} />
                <MainStatCont title="Місце на потоці" data={placeInStream} />
            </div>
            <div className="main-stat-cont-wrap">
              <div className="main-stat-cont">
                <div className="main-stat-rat-subcont">
                  <LeaderboardTable/>
                </div>
              </div>
              <StudentMarks/>
          </div>
        </div>
    </div>
  );
};

export default MainStat;