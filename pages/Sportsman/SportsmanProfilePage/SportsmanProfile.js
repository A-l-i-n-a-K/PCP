import React, { useState } from 'react';
import './SportsmanProfile.css'; // Стили
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar'; // Боковая панель
import PersonalInfo from '../../../components/ProfileComponents/PersonalInfo';
import SportInfo from '../../../components/ProfileComponents/SportInfo';
import { useGlobalState } from '../../../GlobalStateContext';

const SportsmanProfile = () => {
  const { profilePhoto, setProfilePhoto } = useGlobalState();

  // Обработчик выбора файла
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

  const [userData, setUserData] = useState({
    login: 'Alina',  
    name: 'ФИО',
    age: 0,
    email: 'kubitskaya.alina@gmail.com',
    phone: '+375330000000',
    gender: 'Мужской',
    sport: 'Вид спорта',
    coachId: 'ID тренера',
  });

  const handleSave = (updatedData) => {
    setUserData(updatedData);
  };

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
          <h2 className="sportsmanProfile-headerTitle">{userData.login}</h2>
        </div>
        <div>
          <PersonalInfo userData={userData} onSave={handleSave} />
          <SportInfo userData={userData} onSave={handleSave}/>
        </div>
      </main>
    </div>
  );
};

export default SportsmanProfile;
