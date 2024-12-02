import React from 'react';
import './Feature.css';

function Feature({ title, text, image }) {
  return (
    <div className="feature-component">
      <div className="content">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="image-container">
        <img src={image} alt="Illustration" />
      </div>
    </div>
  );
}

export default Feature;
