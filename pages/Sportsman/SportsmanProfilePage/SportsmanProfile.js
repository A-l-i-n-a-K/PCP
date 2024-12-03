import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import './SportsmanProfile.css'; // Стили
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar'; // Боковая панель
import PersonalInfo from '../../../components/ProfileComponents/PersonalInfo';
import SportInfo from '../../../components/ProfileComponents/SportInfo';
import { useGlobalState } from '../../../GlobalStateContext';

const SportsmanProfile = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { profilePhoto, setProfilePhoto } = useGlobalState();

  // Начальные значения для данных пользователя
  const defaultUserData = {
    name: '',  // Логин хранится в поле name
    fio: 'ФИО',   // ФИО
    age: 0,    // Возраст
    email: '', // Электронная почта
    phone: '+375330000000', // Телефон
    gender: 'Мужской', // Пол
    sport: 'Вид спорта',  // Вид спорта
    coachId: 'ID тренера', // ID тренера
  };

  // Состояние для данных пользователя
  const [userData, setUserData] = useState(defaultUserData);

  // Состояние для индикатора загрузки
  const [loading, setLoading] = useState(true);

  // Состояние для списка пользователей
  const [users, setUsers] = useState([]);

  // Обработчик выбора файла для загрузки фото
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result); // Устанавливаем загруженное фото
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };

  // Запрос на сервер для получения списка всех пользователей
  useEffect(() => {
    axios.get(`http://localhost:8080/users`) // Запрос на сервер для получения списка всех пользователей
      .then((response) => {
        setUsers(response.data); // Сохраняем список пользователей
      })
      .catch((error) => {
        console.error("Ошибка загрузки списка пользователей:", error);
      });
  }, []);

  // Подгрузка данных пользователя по ID из списка пользователей
  useEffect(() => {
    if (id) {
      console.log(`Проверка профиля пользователя с ID: ${id}`);

      // Отправляем GET запрос на сервер для получения профиля по ID
      axios.get(`http://localhost:8080/sportsmanProfile/${id}`)
        .then(response => {
          // Если профиль найден или создан, обновляем данные
          setUserData(response.data);
          setLoading(false);
        })
        .catch(error => {
          // Ошибка при загрузке профиля, например, если профиль не найден
          console.error("Ошибка при загрузке профиля:", error);
          setLoading(false);
        });
    }
  }, [id]); // Перезапускаем эффект, если ID изменится

  // Рендерим загрузку данных, если они еще не подгрузились
  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="sportsmanProfile-page">
      <SportsmanSidebar /> {/* Используем глобальное состояние для фото профиля */}

      <main className="sportsmanProfile-mainContent">
        <div className="sportsmanProfile-header">
          <div className="sportsmanProfile-avatar">
            <img
              src={profilePhoto}
              alt="Профиль"
              className="sportsmanProfile-avatarImage"
            />
            {/* Инпут для загрузки фото */}
            <label htmlFor="photo-upload" className="sportsmanProfile-avatarAdd">
              +
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }} // Прячем стандартный input
              />
            </label>
          </div>
          <h2 className="sportsmanProfile-headerTitle">{userData.name}</h2> {/* Отображаем name как логин */}
        </div>

        <div>
          <PersonalInfo userData={userData} onSave={setUserData} />
          <SportInfo userData={userData} onSave={setUserData} />
        </div>
      </main>
    </div>
  );
};

export default SportsmanProfile;
