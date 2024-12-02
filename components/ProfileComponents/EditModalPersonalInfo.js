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
          Логин:
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </label>
        <label>
          ФИО:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Возраст:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Номер телефона:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Пол:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
        </label>
        {formData.role === 'coach' && (
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
        )}
        <div>
          <img className="editModal-close" src={yes} alt="да" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
