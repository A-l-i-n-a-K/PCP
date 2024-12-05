import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TableComponent.css";

const TableComponent = ({ setSelectedRow }) => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/sportsmanData/datas?sportsmanId=${id}`
      );
      const data = await response.json();
      setData(data);
      setSortedData(data); // Изначально сортированные данные совпадают с оригинальными
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Функция сортировки
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const newSortedData = [...sortedData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === "" || aValue === null) return direction === "ascending" ? 1 : -1;
      if (bValue === "" || bValue === null) return direction === "ascending" ? -1 : 1;

      const isANumber = !isNaN(aValue);
      const isBNumber = !isNaN(bValue);

      if (isANumber && isBNumber) {
        return direction === "ascending" ? aValue - bValue : bValue - aValue;
      }

      if (!isANumber && !isBNumber) {
        return direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return isANumber ? (direction === "ascending" ? -1 : 1) : direction === "ascending" ? 1 : -1;
    });

    setSortConfig({ key, direction });
    setSortedData(newSortedData);
  };

  // Для отображения стрелок сортировки
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  const handleRowClick = (index) => {
    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
      setSelectedRow(null);
    } else {
      setSelectedRowIndex(index);
      setSelectedRow({ ...sortedData[index], index });
    }
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("indicator")}>
              Показатель {getSortArrow("indicator")}
            </th>
            <th onClick={() => handleSort("meaning")}>
              Значение {getSortArrow("meaning")}
            </th>
            <th onClick={() => handleSort("date")}>
              Дата {getSortArrow("date")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={selectedRowIndex === index ? "selected" : ""}
              onClick={() => handleRowClick(index)}
            >
              <td>{row.indicator}</td>
              <td>{row.meaning}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
