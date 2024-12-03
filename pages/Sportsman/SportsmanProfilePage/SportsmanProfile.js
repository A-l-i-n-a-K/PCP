import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
        const newProfilePhoto = e.target.result;  // Загружаем изображение как Base64 строку
        setProfilePhoto(newProfilePhoto); // Обновляем глобальное состояние с новым фото
        // Обновляем профиль на сервере
        updateProfileData({ profilePhoto: newProfilePhoto });
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };

  // Загрузка списка пользователей
  useEffect(() => {
    axios.get(`http://localhost:8080/users`) // Запрос на сервер для получения списка всех пользователей
      .then((response) => {
        setUsers(response.data); // Сохраняем список пользователей
      })
      .catch((error) => {
        console.error("Ошибка загрузки списка пользователей:", error);
      });
  }, []); // Загрузка списка пользователей

  // Подгрузка данных пользователя по ID
  useEffect(() => {
    if (id && users.length > 0) {
      console.log(`Проверяем профиль пользователя с ID: ${id}`);

      // Находим пользователя по ID из списка
      const foundUser = users.find(user => user.id === parseInt(id));
      if (foundUser) {
        // Проверяем, существует ли профиль в SportsmanProfile
        axios.get(`http://localhost:8080/sportsmanProfile/${id}`)
          .then((response) => {
            // Если профиль существует, обновляем данные
            setUserData(response.data);
            setLoading(false); // Данные загружены
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // Если профиль не найден, создаем новый профиль
              console.log("Профиль не найден, создаём новый профиль...");
              saveProfileData(defaultUserData); // Создаём новый профиль с дефолтными данными
            } else {
              console.error("Ошибка при загрузке профиля:", error);
              setLoading(false); // Останавливаем загрузку в случае ошибки
            }
          });
      } else {
        console.error("Пользователь не найден в списке.");
        setLoading(false);
      }
    }
  }, [id, users]); // Перезапускаем эффект, если id или users изменились

  // Функция для отправки данных на сервер для сохранения нового профиля
  const saveProfileData = (data) => {
    axios.post('http://localhost:8080/sportsmanProfile/sportsmanProfileData', data)
      .then((response) => {
        console.log('Данные успешно сохранены:', response.data);
        setUserData(data); // Сохраняем данные в стейте после успешного сохранения
        setLoading(false); // Останавливаем индикатор загрузки
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };

  // Функция для обновления данных профиля
  const updateProfileData = (updatedData) => {
    const updatedProfile = {
      ...userData,
      ...updatedData, // Обновляем только нужные данные, в данном случае только фото
    };

    axios.put(`http://localhost:8080/sportsmanProfile/sportsmanProfileData/${id}`, updatedProfile)
      .then((response) => {
        console.log('Профиль обновлен:', response.data);
        setUserData(response.data); // Обновляем данные пользователя после успешного обновления
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  };

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
