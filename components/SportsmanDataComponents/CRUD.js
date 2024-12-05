import React, { useState } from 'react';
import './CRUD.css';
import AddComponent from '../AddComponent/AddComponent';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
import EditComponent from '../EditComponent/EditComponent';
import ErrorEditModalData from './ErrorEditModalData';

const CRUD = ({ scrollToAddData, selectedRow, setIsEditing, handleDeleteData }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    if (selectedRow) {
      setIsEditing(true);
    } else {
      setErrorMessage("Выберите строку для редактирования");
    }
  };

  const handleDelete = async () => {
    if (selectedRow) {
      try {
        await handleDeleteData(selectedRow);
      } catch (error) {
        setErrorMessage("Ошибка удаления: " + error.message);
      }
    } else {
      setErrorMessage("Выберите строку для удаления");
    }
  };

  return (
    <div className="crud-content">
      <AddComponent onClick={scrollToAddData} />
      <EditComponent onClick={handleEdit} />
      <DeleteComponent onClick={handleDelete} />
      {errorMessage && (
        <ErrorEditModalData
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default CRUD;
