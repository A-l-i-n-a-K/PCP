import React, { useState, useRef } from 'react';
import './SportsmanData.css';
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar';
import AddData from '../../../components/SportsmanDataComponents/AddData';
import TableComponent from '../../../components/SportsmanDataComponents/TableComponent';
import CRUD from '../../../components/SportsmanDataComponents/CRUD';
import EditModalData from '../../../components/SportsmanDataComponents/EditModalData';
import ErrorEditModalData from '../../../components/SportsmanDataComponents/ErrorEditModalData';

const SportsmanData = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const addDataRef = useRef(null);

  const handleSaveData = (newData) => {
    setTableData([...tableData, ...newData]);
  };

  const handleUpdateData = (updatedRow) => {
    const updatedData = tableData.map((row, index) => (index === selectedRow.index ? updatedRow : row));
    setTableData(updatedData);
    setIsEditing(false);
    setSelectedRow(null);
  };

  const handleDeleteData = () => {
    if (selectedRow) {
      const updatedData = tableData.filter((_, index) => index !== selectedRow.index);
      setTableData(updatedData);
      setSelectedRow(null);
    } else {
      setErrorMessage("Выберите строку для удаления");
    }
  };

  const scrollToAddData = () => {
    if (addDataRef.current) {
      addDataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sportsmanData-page">
      <SportsmanSidebar />
      <div ref={addDataRef}>
        <AddData onSave={handleSaveData} />
      </div>
      <div className='sportsmanData-row'>
        <TableComponent data={tableData} setSelectedRow={setSelectedRow} />
        <CRUD
          scrollToAddData={scrollToAddData}
          selectedRow={selectedRow}
          setIsEditing={setIsEditing}
          setErrorMessage={setErrorMessage}
          handleDeleteData={handleDeleteData}
        />
      </div>
      {isEditing && (
        <EditModalData
          row={selectedRow}
          onSave={handleUpdateData}
          onClose={() => setIsEditing(false)}
        />
      )}
      {errorMessage && (
        <ErrorEditModalData
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default SportsmanData;
  