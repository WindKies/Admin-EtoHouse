import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { dataCharts } from "../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu Đồ Thông Kê Đơn Hàng",
    },
  },
};

export const data = {
  labels: dataCharts.map((item) => item.thang),
  datasets: [
    {
      label: "Thanh Toán Khi Nhận Hàng",
      data: dataCharts.map((item) => item.thanhtoankhinhanhang),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Thành Toán Online",
      data: dataCharts.map((item) => item.thanhtoanonline),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Chart = () => {
  return (
    <section
      className="chart"
      style={{ marginRight: "24px", marginLeft: "24px" }}
    >
      <div className="chart__wrapper">
        <Bar options={options} data={data} />
      </div>
    </section>
  );
};

export default Chart;
