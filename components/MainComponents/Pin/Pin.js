import React from 'react';
import './Pin.css';

function Pin({ title, icon }) {
  return (
    <div className="pin">
      <img src={icon} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default Pin;