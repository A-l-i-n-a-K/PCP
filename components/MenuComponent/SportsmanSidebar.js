import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Menu from './Menu';
import clipboard from '../../svg/clipboard.svg';
import edit from '../../svg/edit.svg';
import exit from '../../svg/exit.svg';
import vector from '../../svg/vector.svg';
import { useGlobalState } from '../../GlobalStateContext';

const SportsmanSidebar = () => {
  const { id } = useParams(); // Получаем ID из URL
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu, profilePhoto } = useGlobalState();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
 
  const handleTest = () => {
    navigate(`/psychologyTest/${id}`);
  };

  const handleAnalysis = () => {
    navigate(`/analysis/${id}`);
  };

  const handleData = () => {
    navigate(`/sportsmanData/${id}`);
  };

  const handleProfileClick = () => {
    navigate(`/sportsmanProfile/${id}`);
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="profile-sidebar">
      <h1 className="sidebar-title">FitQuest</h1>
      <img 
        src={profilePhoto} 
        alt="Профиль" 
        className="profile-photo" 
        onClick={handleProfileClick} // Добавляем обработчик клика
      />
      <div className="menu-group">
        <Menu 
          title="Данные" 
          icon={clipboard} 
          isActive={activeMenu === "Данные"}
          onClick={() => {
            handleMenuClick("Данные");
            handleData();
          }} 
        />
        <Menu 
          title="Анализ данных" 
          icon={edit} 
          isActive={activeMenu === "Анализ данных"}
          onClick={() => {handleMenuClick("Анализ данных");
            handleAnalysis();
          }} 
        />
        <Menu 
          title="Психологический текст" 
          icon={vector} 
          isActive={activeMenu === "Психологический текст"}
          onClick={() => {handleMenuClick("Психологический текст");
            handleTest();}
          } 
        />
      </div>
      <div className="menu-exit">
        <Menu 
          title="Выйти" 
          icon={exit} 
          isExit={true}
          isActive={activeMenu === "Выйти"}
          onClick={() => {
            handleMenuClick("Выйти");
            handleExit();
          }} 
        />
      </div>
    </div>
  );
};

export default SportsmanSidebar;
