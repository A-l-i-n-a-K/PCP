import React, { useState } from 'react';
import './EditModalData.css';
import yes from '../../svg/yes.svg';

const EditModalData = ({ row, onSave, onClose }) => {
  const [value, setValue] = useState(row.значение);
  const [date, setDate] = useState(row.дата);

  const handleSave = () => {
    onSave({ ...row, значение: value, дата: date });
  };

  return (
    <div className="editModalData">
      <div className="editModalData-content">
        <label>
          {row.показатель}:
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
