import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import './EditModalData.css';
import yes from '../../svg/yes.svg';

const EditModalData = ({ row, onSave, onClose }) => {
  const { id } = useParams();
  const [value, setValue] = useState(row.meaning);
  const [date, setDate] = useState(row.date);

  const handleSave = () => {
    // Выполняем PUT-запрос
    fetch(`http://localhost:8080/sportsmanData/data/${id}/${row.dataId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...row, meaning: value, date }),
    })
      .then((response) => response.json())
      .then((updatedRow) => {
        console.log('Данные успешно обновлены:', updatedRow);
        onSave(updatedRow); // Передаем обновленные данные в родительский компонент
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
  };

  return (
    <div className="editModalData">
      <div className="editModalData-content">
        <label>
          {row.indicator}:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <label>
          Дата:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div>
          <img
            className="editModalData-close"
            src={yes}
            alt="да"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModalData;
