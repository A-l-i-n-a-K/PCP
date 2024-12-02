import React from 'react';
import './AddComponent.css';
import plus from '../../svg/plus.svg';

const AddComponent = ({onClick}) => {
  return (
    <div className="add-component" onClick={onClick}>
      <img src={plus} alt="плюс" className="add-component-icon" />
      <p className="add-component-title">Добавить</p>
    </div>
  );
}

export default AddComponent;