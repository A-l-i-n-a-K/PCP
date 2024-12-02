import React from 'react';
import './IconAndText.css';

function IconAndText({ title, icon }) {
  return (
    <div className="psychology-icon">
      <img src={icon} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default IconAndText;