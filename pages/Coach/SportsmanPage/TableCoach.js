import React, { useState, useEffect } from "react";
import "../../../components/SportsmanDataComponents/TableComponent.css";

const TableCoach = ({ data, setSelectedRow }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [sortedData, setSortedData] = useState(data);

  // Функция сортировки
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const newSortedData = [...data].sort((a, b) => {
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

  // Получение стрелки сортировки
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  // Обработка клика по строке
  const handleRowClick = (index) => {
    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
      setSelectedRow?.(null); // Безопасный вызов
    } else {
      setSelectedRowIndex(index);
      setSelectedRow?.({ ...sortedData[index], index }); // Безопасный вызов
    }
  };

  // Обновление данных при их изменении
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <div className="table-container-coach">
      <table className="styled-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("показатель")}>
              Показатель {getSortArrow("показатель")}
            </th>
            <th onClick={() => handleSort("значение")}>
              Значение {getSortArrow("значение")}
            </th>
            <th onClick={() => handleSort("дата")}>
              Дата {getSortArrow("дата")}
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
              <td>{row.показатель}</td>
              <td>{row.значение}</td>
              <td>{row.дата}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCoach;
