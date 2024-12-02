import React, { useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import "./Analysis.css";
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar';

// Регистрация модулей Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Analysis = () => {
  const [dataType, setDataType] = useState("Вес");
  const [graphType, setGraphType] = useState("line");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const data = [
    { показатель: "Вес", значение: 47, дата: "2024-10-01" },
    { показатель: "Вес", значение: 50, дата: "2024-10-17" },
    { показатель: "Вес", значение: 52, дата: "2024-10-22" },
    { показатель: "Вес", значение: 52, дата: "2024-10-22" },
    { показатель: "Вес", значение: 52, дата: "2024-10-22" },
    { показатель: "Рост", значение: 170, дата: "2024-10-01" },
    { показатель: "Рост", значение: 172, дата: "2024-10-17" },
    { показатель: "Рост", значение: 173, дата: "2024-10-22" },
    { показатель: "Рост", значение: 171, дата: "2024-11-01" },
  ];

  // Фильтрация данных по параметрам
  const filteredData = data
    .filter((item) => item.показатель === dataType)
    .filter((item) => {
      const itemDate = new Date(item.дата);
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });

  // Цвета для различных колонок в столбчатом графике
  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(135, 206, 235, 0.6)",
    "rgba(221, 160, 221, 0.6)",
  ];

  // Подготовка данных для графика
  const chartData = {
    labels: filteredData.map((item) => item.дата),
    datasets: [
      {
        label: dataType,
        data: filteredData.map((item) => item.значение),
        borderColor: "orange",
        backgroundColor: colors, // Используем цвета для столбчатого графика
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: filteredData.map((item) => item.дата),
    datasets: [
      {
        label: dataType,
        data: filteredData.map((item) => item.значение),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const averageValue =
    filteredData.reduce((sum, item) => sum + item.значение, 0) /
    filteredData.length || 0;
  const averageChange =
    filteredData.length > 1
      ? filteredData
          .slice(1)
          .reduce(
            (sum, item, index) =>
              sum + Math.abs(item.значение - filteredData[index].значение),
            0
          ) /
        (filteredData.length - 1)
      : 0;

  return (
    <div className="analysis-page">
      <SportsmanSidebar />
      <div className="analysis-content">
        <div className="analysis-graph-container">
          <div className="analysis-text-and-charts">
            <div className="analysis-controls">
              <div>
                <label>Тип графика:
                  <select
                    value={graphType}
                    onChange={(e) => setGraphType(e.target.value)}
                  >
                    <option value="line">Линейный</option>
                    <option value="bar">Столбчатый</option>
                    <option value="pie">Круговая диаграмма</option>
                  </select>
                </label>
                <label>Параметр:
                  <select
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                  >
                    <option value="Рост">Рост</option>
                    <option value="Вес">Вес</option>
                    <option value="Дистанция">Дистанция</option>
                    <option value="Время">Время</option>
                    <option value="Дистанция метания">Дистанция метания</option>
                    <option value="Вес груза">Вес груза</option>
                    <option value="Длина прыжка">Длина прыжка</option>
                    <option value="Высота прыжка">Высота прыжка</option>
                  </select>
                </label>
              </div>
              <div className="analysis-row">
                <label>Начальная дата:
                  <input
                    type="date"
                    name="beginDate"
                    value={startDate ? startDate.toISOString().split("T")[0] : ""}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                  />
                </label>
                <label>Конечная дата:
                  <input
                    type="date"
                    name="endDate"
                    value={endDate ? endDate.toISOString().split("T")[0] : ""}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                  />
                </label>
              </div>
              <div className="statistics">
                <p>Среднее значение: {averageValue.toFixed(1)}</p>
                <p>Среднее изменение: {averageChange.toFixed(1)}</p>
              </div>
            </div>
            <div className="chart">
              {graphType === "line" && <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />}
              {graphType === "bar" && <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />}
              {graphType === "pie" && <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
