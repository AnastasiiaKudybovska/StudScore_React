import React from "react";
import { defaults } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { FaGem } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const MyChart = () => {
  const labels = Array.from({ length: 6 }, () => '');
  const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      fill: false,
      data: [5, 2, 5, 5, 3, 5],
      borderColor: '#42BFDD',
      tension: 0.1,
      pointBackgroundColor: '#42BFDD',
      borderWidth: 3
    },
  ],
  
  };
  const options = {
    plugins: {
     legend: {
          display: false,
        },
    }
  };
  defaults.font.size = 20;
  defaults.font.family = "'Lora', 'serif'";
  return (
    <div className="stat-chart">
      <div className="stat-chart-subcont">
        <div className="rat-title-cont2">
          <h2 className="h2-place">Середній бал</h2>
          <div className="stat-chart-mark" id="stat-chart-mark-id">
            <p className="rating-mark-block">
              92.975 <AiFillStar className="fa fa-star"/>
            </p>
            <p className="rating-mark-block">
              5.0 <FaGem className="fa fa-gem"/> 
            </p>
          </div>
        </div>
        <hr />
        <Line id="myChart" data={data} options={options} />
      </div>
    </div>
  );
};

export default MyChart;