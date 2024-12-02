import React from 'react';
import './EditComponent.css';
import edit from '../../svg/edit-2.svg';

const EditComponent = ({onClick}) => {
  return (
    <div className="edit-component" onClick={onClick}>
      <img src={edit} alt="изменить" className="edit-component-icon" />
      <p className="edit-component-title">Изменить</p>
    </div>
  );
}

export default EditComponent;