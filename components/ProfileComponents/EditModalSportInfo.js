import React, { useState } from 'react';
import axios from 'axios';
import './EditModal.css';
import yes from '../../svg/yes.svg';

const EditModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...userData });

  // Преобразование вида спорта в enum
  const mapSportToEnum = (sportName) => {
    const sportMapping = {
      'Лёгкая атлетика': 'ATHLETICS',
      'Плавание': 'SWIMMING',
      'Баскетбол': 'BASCETBALL',
      'Волейбол': 'VOLLEYBALL',
    };
    return sportMapping[sportName] || null; // Возвращаем enum или null
  };

  // Преобразование из enum в читаемое название
  const mapEnumToSport = (sportEnum) => {
    const sportMapping = {
      ATHLETICS: 'Лёгкая атлетика',
      SWIMMING: 'Плавание',
      BASCETBALL: 'Баскетбол',
      VOLLEYBALL: 'Волейбол',
    };
    return sportMapping[sportEnum] || sportEnum; // Возвращаем читаемое название или исходное значение
  };

  // Обновление состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработка отправки формы
  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      sport: mapSportToEnum(formData.sport), // Преобразуем вид спорта в enum
    };

    axios
      .put(`http://localhost:8080/Profile/ProfileData/${userData.id}`, updatedFormData)
      .then((response) => {
        onSave(response.data); // Обновляем состояние в родительском компоненте
        onClose(); // Закрываем модальное окно
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
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
            <option value="Лёгкая атлетика">Лёгкая атлетика</option>
            <option value="Плавание">Плавание</option>
            <option value="Баскетбол">Баскетбол</option>
            <option value="Волейбол">Волейбол</option>
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
          <img
            className="editModal-close"
            src={yes}
            alt="да"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
