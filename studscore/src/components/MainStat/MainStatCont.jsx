import React from 'react';

import './MainStat.scss'
const MainStatCont = ({title, data}) => {
  return (
    <div className="main-stat-subcont">
      <h2 className="h2-place">{title}</h2>
      <div style={{ filter: "drop-shadow( 0px 4px 4px rgba(0, 0, 0, 0.2)) drop-shadow( 0px 7px 9px  rgba(0, 0, 0, 0.14))" }}>
        <div className={`place-wrap ${title === "Місце на потоці" ? "wr2" : ""}`}>
          <p>{data}</p>
        </div>
      </div>
    </div>
  );
};

export default MainStatCont;