import React from 'react';
import './DeleteComponent.css';
import trash from '../../svg/trash.svg';

const DeleteComponent = ({onClick}) => {
  return (
    <div className="delete-component" onClick={onClick}>
      <img src={trash} alt="Мусорка" className="delete-component-icon" />
      <p className="delete-component-title">Удалить</p>
    </div>
  );
}

export default DeleteComponent;