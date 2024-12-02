import React from 'react';
import './FeatureBlue.css';

function FeatureBlue({ title, text, image }) {
  return (
    <div className="feature-component-blue">
      <div className="image-container">
        <img src={image} alt="Illustration" />
      </div>
      <div className="content-blue">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      
    </div>
  );
}

export default FeatureBlue;
