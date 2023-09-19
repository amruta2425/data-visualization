import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import style from "./Chart.module.scss";
import { formatDate } from "../../utils/functions";

Chart.register(CategoryScale);

export const BarChart = ({ currentData }) => {
  const [chartData, setChartData] = useState({
    labels: currentData.map((i) => formatDate(i.date)),
    datasets: [
      {
        label: "Bitcoin Rate ",
        data: currentData.map((i) => i.priceUsd),
        backgroundColor: ["#2a71d0"],

        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className={style.chartContainer}>
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Bitcoin data for the past 30 days (USD)",
            },
            legend: {
              display: false,
            },
          },
          indexAxis: "x",
          scales: {
            y: {
              min: 22000, // minimum will be 22000, unless there is a lower value.
            },
          },
        }}
      />
    </div>
  );
};

function LineChart({ currentData }) {
  const [chartData, setChartData] = useState({
    labels: currentData.map((i) => formatDate(i.date)),
    datasets: [
      {
        label: "Bitcoin Rate ",
        data: currentData.map((i) => i.priceUsd),
        backgroundColor: [
          "#f3ba2f",
        ],

        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className={style.chartContainer}>
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Bitcoin data for the past 30 days (USD)",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;


