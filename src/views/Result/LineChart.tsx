import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";
import { ANSWERS } from "src/__mocks__/Answers";

const LineChart = () => {
  const data = ANSWERS.map((ans) => ans.duration);
  const indexes = ANSWERS.map((answer, index) => index + 1);

  const x = {
    series: [
      {
        name: "time",
        data,
      },
    ],
  };

  const options: ApexOptions = {
    chart: {
      height: 500,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Time",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: indexes,
    },
  };

  return <Chart options={options} series={x.series} type="line" height={350} />;
};

export default LineChart;
