import React from 'react';
import './Sidebar.css';
import Menu from './Menu';
import sportsman from '../../svg/sportsman.svg';
import exit from '../../svg/exit.svg';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../GlobalStateContext';

const CoachSidebar = () => {
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu, profilePhoto } = useGlobalState();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleProfileClick = () => {
    navigate('/coachProfile');
  };

  const handleSportsmansClick = () => {
    navigate('/sportsmans');
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
          title="Спортсмены" 
          icon={sportsman} 
          isActive={activeMenu === "Спортсмены"}
          onClick={() => {handleMenuClick("Спортсмены");
            handleSportsmansClick();
          }} 
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

export default CoachSidebar;
