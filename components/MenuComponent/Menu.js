import React from 'react';
import './Menu.css';

const Menu = ({ title, icon, isExit, isActive, onClick }) => {
  return (
    <div className={`menu ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src={icon} alt={title} className="menu-icon" />
      <p className={`menu-title ${isExit ? 'menu-title-exit' : ''}`}>{title}</p>
    </div>
  );
}

export default Menu;
