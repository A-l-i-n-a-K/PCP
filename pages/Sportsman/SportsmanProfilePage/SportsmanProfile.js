import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SportsmanProfile.css';
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar';
import PersonalInfo from '../../../components/ProfileComponents/PersonalInfo';
import SportInfo from '../../../components/ProfileComponents/SportInfo';
import { useGlobalState } from '../../../GlobalStateContext';

const SportsmanProfile = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { profilePhoto, setProfilePhoto } = useGlobalState();

  const defaultUserData = {
    name: '',
    fio: 'ФИО',
    age: 0,
    email: '',
    phone: '+375330000000',
    gender: 'Мужской',
    sport: 'Вид спорта',
    coachId: null,
    profilePhoto: '', // Добавлено фото
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки списка пользователей:', error);
      });
  }, []);

  useEffect(() => {
    if (id && users.length > 0) {
      const foundUser = users.find(user => user.id === parseInt(id));
      if (foundUser) {
        axios.get(`http://localhost:8080/Profile/${id}`)
          .then((response) => {
            setUserData(response.data);
            setProfilePhoto(response.data.profilePhoto); // Устанавливаем фото
            setLoading(false);
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              saveProfileData(defaultUserData);
            } else {
              console.error('Ошибка при загрузке профиля:', error);
              setLoading(false);
            }
          });
      } else {
        console.error('Пользователь не найден.');
        setLoading(false);
      }
    }
  }, [id, users]);

  const saveProfileData = (data) => {
    axios.post('http://localhost:8080/Profile/ProfileData', data)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = e.target.result; // Base64
        setProfilePhoto(newPhoto);
        updateProfileData({ profilePhoto: newPhoto });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileData = (updatedData) => {
    const updatedProfile = { ...userData, ...updatedData };
    axios.put(`http://localhost:8080/Profile/ProfileData/${id}`, updatedProfile)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  };

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="sportsmanProfile-page">
      <SportsmanSidebar />

      <main className="sportsmanProfile-mainContent">
        <div className="sportsmanProfile-header">
          <div className="sportsmanProfile-avatar">
            <img
              src={profilePhoto || 'https://via.placeholder.com/150'}
              alt="Профиль"
              className="sportsmanProfile-avatarImage"
            />
            <label htmlFor="photo-upload" className="sportsmanProfile-avatarAdd">
              +
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <h2 className="sportsmanProfile-headerTitle">{userData.name}</h2>
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
