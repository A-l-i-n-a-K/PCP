import React, { useState } from 'react';
import './EditModal.css';
import yes from '../../svg/yes.svg';

const EditModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="editModal">
      <div className="editModal-content">
        <h2>Редактирование данных</h2>
        <label>
          Вид спорта:
          <select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
          >
            <option value="Легкая атлетика">Легкая атлетика</option>
            <option value="Плавание">Плавание</option>
            <option value="Волейбол">Волейбол</option>
            <option value="Футбол">Футбол</option>
          </select>
        </label>
        <label>
          ID тренера:
          <input
            type="number"
            name="coachId"
            value={formData.coachId}
            onChange={handleChange}
          />
        </label>
        <div>
        <img className="editModal-close" src={yes} alt="да" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
