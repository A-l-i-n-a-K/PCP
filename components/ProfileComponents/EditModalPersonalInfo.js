import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditModal.css';
import yes from '../../svg/yes.svg';

const EditModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [role, setRole] = useState(''); // Добавим состояние для роли

  const mapSportToEnum = (sportName) => {
    const sportMapping = {
      'Лёгкая атлетика': 'ATHLETICS',
      'Плавание': 'SWIMMING',
      'Баскетбол': 'BASCETBALL',
      'Волейбол': 'VOLLEYBALL',
    };
    return sportMapping[sportName] || null; // Возвращаем enum или null
  };
  useEffect(() => {
    // Получаем данные о пользователе по его ID
    axios
      .get(`http://localhost:8080/users/${userData.id}`) // Здесь у вас должен быть правильный endpoint для получения данных о пользователе
      .then((response) => {
        // Сохраняем данные о роли в состояние
        const user = response.data;
        setRole(user.role); // предполагаем, что роль пользователя находится в поле 'role'
        setFormData({ ...formData, role: user.role }); // Обновляем formData, если необходимо
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      });
  }, [userData.id]); // Запрашиваем только при изменении ID пользователя

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      gender: formData.gender === 'Мужской' ? 'MALE' : 'FEMALE',
      sport:mapSportToEnum(formData.sport),
    };

    axios
      .put(`http://localhost:8080/Profile/ProfileData/${userData.id}`, updatedFormData)
      .then((response) => {
        onSave(response.data); // Передаем обновленные данные в родительский компонент
        onClose(); // Закрываем модальное окно
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });

    axios
      .put(`http://localhost:8080/user/${userData.id}`, updatedFormData)
      .then((response) => {
        onSave(response.data); // Передаем обновленные данные в родительский компонент
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
          Логин:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          ФИО:
          <input
            type="text"
            name="fio"
            value={formData.fio}
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
        {role === 'COACH' && ( // Отображаем поле выбора спорта только для тренеров
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
        )}
        <div>
          <img className="editModal-close" src={yes} alt="да" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
