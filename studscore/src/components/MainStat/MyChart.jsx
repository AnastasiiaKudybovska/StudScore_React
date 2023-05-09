import React, { useEffect, useState } from "react";
import { defaults } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line, Bar,  Pie } from "react-chartjs-2";
import { FaGem } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import AxiosClient from "../AxiosClient";
import CustomAlert from "../CustomAlert";
import styled from 'styled-components';

import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
const DotCont= styled.div`
  min-height:  ${(props) => (props.size)}px;
  min-width:  ${(props) => (props.size + 1)}px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  background-color: ${(props) => (props.color)}
`;
// background-color: //${(props) => (props.success ? '#23b86b' : '#b7094c')};


const MyChart = (props) => {
  const user = props.user ? props.user : null;
  const [marks, setMarks] = useState([]);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  useEffect(() => {
    async function getMarksChart() {
      if (user && user.id) {
        return AxiosClient.get(`/students/${user.id}/marks`)
        .then((response) => {
          if (response.status === 200) {
            setMarks(response.data);
            // console.log(response.data) 
          }
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(error.response.data.error.message);
          setAlertSuccess(false);
          setAlertKey(alertKey + 1);
        })
        
    }
  }
    getMarksChart();
  }, [user]);
  const labels = marks.map((_, i) => ` `);
  const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      fill: false,
      data: marks.map(item => item.mark),
      borderColor: '#42BFDD',
      tension: 0.1,
      pointBackgroundColor: '#42BFDD',
      borderWidth: 3
    },
  ],
  
  };
  const options = {
    plugins: {
     datalabels: false, 
     legend: {
        display: false,
      },
    }
  };
  defaults.font.size = 16;
  defaults.font.family = "'Lora', 'serif'";
  
  const subjectMarks = marks.reduce((acc, curr) => {
    const subjectName = curr.subject.name;
    const mark = curr.mark;
  
    if (!acc[subjectName]) {
      acc[subjectName] = { total: 0, count: 0 };
    }
  
    acc[subjectName].total += mark;
    acc[subjectName].count++;
  
    return acc;
  }, {});
  
  const subjectAverages = Object.keys(subjectMarks).map((subjectName) => {
    const { total, count } = subjectMarks[subjectName];
    const average = total / count;
  
    return { subject: subjectName, average };
  });


const options2 = {
  indexAxis: 'y',
  plugins: {
    datalabels: {
      color: '#F0F6F6',
    },
    legend: {
    display: false,
      // display: true,
      // position: 'bottom',
      // labels: {
      //   fontColor: 'black',
      //   usePointStyle: true, 
      //   padding: 10, 
      //   boxWidth: 10, 
      //   generateLabels: function(chart) {
      //     return chart.data.datasets.map(function(dataset, index) {
      //       return {
      //         text: dataset.label,
      //         fillStyle: dataset.backgroundColor,
      //         lineCap: 'round',
      //         lineWidth: 0,
      //         // strokeStyle: dataset.borderColor,
      //         pointStyle: 'circle',
      //       };
      //     });
     //   }
      }
    },
};


function generateColors(count, hue, saturation, lightness) {
  const colors = [];
  const increment = 360 / count;
  for (let i = 0; i < count; i++) {
    const hueValue = (hue + i * increment) % 360;
    // if (hueValue != 32 && hueValue != 104){
      colors.push(`hsl(${hueValue}, ${saturation}%, ${lightness}%)`);
    // }
  }
  return colors;
}

const pinkColors = generateColors( subjectAverages.length, 320, 70, 75);
const purpleColors = generateColors(subjectAverages.length / 3, 270, 70, 75);
const blueColors = generateColors(subjectAverages.length / 3 + 1, 210, 70, 75);

const myColors = ['#f72585', '#7209b7','#4361ee', '#4cc9f0', 'rgb(46, 229, 157)']; // '#3a0ca3'

const colors = [...myColors, ...pinkColors, ...purpleColors, ...blueColors];

const filteredColors = colors.filter(color => {
  const hsl = color.match(/\d+/g).map(Number);
  return hsl[0] < 50 || hsl[0] > 65;
});
const datasets = subjectAverages.map((item, index) => ({
  label: item.subject,
  backgroundColor: filteredColors[index],
  borderColor: '#253237',
  borderWidth: 2,
  hoverBackgroundColor: '#BBE6E4',
  data: [item.average],
}));

const data2 = {
  labels: [''],
  datasets,
};

const count = marks.length;

const countsByMark = marks.reduce((acc, curr) => {
  const mark = curr.mark;
  acc[mark] = acc[mark] ? acc[mark] + 1 : 1;
  return acc;
}, {});

const ratiosByMark = {
  1: countsByMark[1] / count * 100,
  2: countsByMark[2] / count * 100,
  3: countsByMark[3] / count * 100,
  4: countsByMark[4] / count * 100,
  5: countsByMark[5] / count * 100,
};

for (const mark in ratiosByMark) {
  if (isNaN(ratiosByMark[mark])) {
    ratiosByMark[mark] = 0;
  }
  if (ratiosByMark[mark] === 0) {
    delete ratiosByMark[mark];
  }
}

const datasets3 = [{
  label: ['5', '4', '3', '2', '1'],
  data: Object.values(ratiosByMark),
  backgroundColor: myColors.slice(0, 5),
  borderColor: '#253237',
  borderWidth: 2,
  hoverBackgroundColor: '#BBE6E4',
  
}];
const data3 = {
  labels: Object.keys(ratiosByMark),
  datasets: datasets3,
};
const options3 = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          return context.label + ': ' + context.formattedValue + '%';
        }
      }
    },
    datalabels: {
      color: '#F0F6F6',
      formatter: function(value, context) {
        return Math.round(value) + '%';
      },
    },
  },
  labels: ['5', '4', '3', '2', '1'],
};
const ratioKeys = Object.keys(ratiosByMark);


  return (
    <div className="stat-chart">
      <div className="stat-chart-subcont">
        <div className="rat-title-cont2">
          <h2 className="h2-place">Середній бал</h2>
          <div className="stat-chart-mark" id="stat-chart-mark-id">
            <p className="rating-mark-block">
              {props.myRatMark} <AiFillStar className="fa fa-star"/>
            </p>
            <p className="rating-mark-block">
              {props.myAverageMark} <FaGem className="fa fa-gem"/> 
            </p>
          </div>
        </div>
        <hr />
        <div className="chart-flex-cont">
          <div className="myChart-in-flex-box1">
              <Bar className="myChart2" data={data2}  options={options2} />
          </div>
          <div className="myChart-in-flex-box2">
            <div className="my-legend-2">
            {subjectAverages.map((item, index) => (
              <div className="legend-2-line" key={item.subject}>
               <DotCont color={filteredColors[index % filteredColors.length]} size={15}/>
               <p>{item.subject}</p>
              </div>
            ))}
            </div>
          </div>
          <Line className="myChart" data={data} options={options} />
         </div>
         <div className="chart-flex-cont chart-flex-cont-pie" style={{flexDirection:"row-reverse", justifyContent:'center', paddingTop:'0'}}>
          <div className="myChart-in-flex-box3">
            <Pie className="myChart3"   plugins={[ChartDataLabels]} data={data3} options={options3}/>
          </div>
          <div className="myChart-in-flex-box2 myChart-in-flex-box2-pie" style={{width:'30%'}}>
            <div className="my-legend-3">
            {ratioKeys.map((key, index) => (
               <div className="legend-2-line" key={key}>
                <DotCont color={myColors[index % myColors.length]} size={20}/>
                {ratiosByMark[key] && <p>{key} - {ratiosByMark[key].toFixed(0)}% </p>}
              </div>
                ))}
            </div>
        </div>
        </div>
      </div> 
      
        {alertMessage && (
          <CustomAlert key={alertKey} message={alertMessage} success={alertSuccess} />
        )}
    </div>
  );
};

export default MyChart;

