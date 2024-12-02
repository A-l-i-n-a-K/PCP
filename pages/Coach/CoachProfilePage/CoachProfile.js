import React, { useState } from 'react';
import './CoachProfile.css'; // Стили
import CoachSidebar from '../../../components/MenuComponent/CoachSidebar'; // Боковая панель
import PersonalInfo from '../../../components/ProfileComponents/PersonalInfo';
import IconAndText from '../../../components/ProfileComponents/IconAndText';
import sport from '../../../svg/sport.svg';
import fingerprint from '../../../svg/fingerprint.svg';
import userSearch from '../../../svg/user-search.svg';
import { useGlobalState } from '../../../GlobalStateContext';

const CoachProfile = () => {
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
    role: 'coach',
    coachId: 'ID тренера',
  });

  const handleSave = (updatedData) => {
    setUserData(updatedData);
  };

  return (
    <div className="coachProfile-page">
      <CoachSidebar/> {/* Передаем фото профиля */}

      <main className="coachProfile-mainContent">
        <div className="coachProfile-header">
        <div className="coachProfile-avatar">
            <img
              src={profilePhoto}
              alt="Профиль"
              className="coachProfile-avatarImage"
            />
            {/* Инпут для загрузки фото */}
            <label htmlFor="photo-upload" className="coachProfile-avatarAdd">
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
          <div  className="coachProfile-headerTitle-sportInfo">
          <h2 className="coachProfile-headerTitle">{userData.login}</h2>
          <div className="profileInfoCoach-group">
        <IconAndText title="Тренер" icon={userSearch} />
        <IconAndText title={userData.sport} icon={sport} />
        <IconAndText title="123456" icon={fingerprint} />
        </div>
      </div>
        </div>
        <div>
        <PersonalInfo userData={userData} onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default CoachProfile;