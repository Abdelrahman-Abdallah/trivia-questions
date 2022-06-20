import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useSelector } from "src/store";
import { extractStackChartData } from "./helpers";

const StackedChart = () => {
  const answers = useSelector((state) => state.answers.answers);

  const { categories, correct, skipped, wrong } = extractStackChartData(answers);

  const series = {
    series: [
      {
        name: "skipped",
        data: skipped,
      },
      {
        name: "correct",
        data: correct,
      },
      {
        name: "wrong",
        data: wrong,
      },
    ],
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return Math.abs(val).toString();
        },
      },
    },
  };

  return <Chart options={options} series={series.series} type="bar" height={350} />;
};

export default StackedChart;
