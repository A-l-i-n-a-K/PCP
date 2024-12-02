import React from 'react';
import './IconAndText.css';

const IconAndText = ({ title, icon, isEdit, onClick }) => {
  return (
    <div className="iconAndText" onClick={onClick}>
      <img src={icon} alt={title} className="iconAndText-icon" />
      <p className={`iconAndText-title ${isEdit ? 'iconAndText-edit' : ''}`}>{title}</p>
    </div>
  );
};


export default IconAndText;