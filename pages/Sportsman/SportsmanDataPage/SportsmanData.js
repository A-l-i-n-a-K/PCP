import React, { useState, useRef } from "react";
import "./SportsmanData.css";
import SportsmanSidebar from "../../../components/MenuComponent/SportsmanSidebar";
import AddData from "../../../components/SportsmanDataComponents/AddData";
import TableComponent from "../../../components/SportsmanDataComponents/TableComponent";
import CRUD from "../../../components/SportsmanDataComponents/CRUD";
import EditModalData from "../../../components/SportsmanDataComponents/EditModalData";

const SportsmanData = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const addDataRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/sportsmanData/datas");
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const handleDeleteData = async (selectedRow) => {
    try {
      const { sportsmanId, dataId } = selectedRow;
      const response = await fetch(
        `http://localhost:8080/sportsmanData/data/${sportsmanId}/${dataId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Ошибка при удалении данных");
      }

      setTableData((prevData) =>
        prevData.filter((_, index) => index !== selectedRow.index)
      );
      setSelectedRow(null);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const scrollToAddData = () => {
    if (addDataRef.current) {
      addDataRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sportsmanData-page">
      <SportsmanSidebar />
      <div ref={addDataRef}>
        <AddData />
      </div>
      <div className="sportsmanData-row">
        <TableComponent data={tableData} setSelectedRow={setSelectedRow} />
        <CRUD
          scrollToAddData={scrollToAddData}
          selectedRow={selectedRow}
          setIsEditing={setIsEditing}
          handleDeleteData={handleDeleteData}
        />
      </div>
      {isEditing && (
        <EditModalData
          row={selectedRow}
          onSave={(updatedRow) => {
            const updatedData = tableData.map((row, index) =>
              index === selectedRow.index ? updatedRow : row
            );
            setTableData(updatedData);
            setIsEditing(false);
            setSelectedRow(null);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default SportsmanData;
