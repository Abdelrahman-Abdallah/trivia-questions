import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "src/store";
import { extractPieData } from "./helpers";

const PieChart = () => {
  const answers = useSelector((state) => state.answers.answers);

  const data = extractPieData(answers);
  const label = Object.keys(data);
  const series = Object.values(data);

  const options: ApexOptions = {
    labels: label,
    colors: ["#02e396", "#058efb", "#feb019"],
    series: [44, 55, 13],
    chart: {
      height: 500,
      type: "pie",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },

    title: {
      text: "Question types",
      align: "left",
    },
  };
  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default PieChart;
