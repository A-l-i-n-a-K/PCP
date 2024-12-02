import React from 'react';
import './EditModalData.css';
import cross from '../../svg/cross.svg';

const ErrorModal = ({ message, onClose }) => {
  return (
<div className="editModalDataError">
<div className="editModalDataError-content">
  <h3 className="editModalDataError-h3">Ошибки:</h3>
  <p className="editModalDataError-p">{message}</p>
  <img className="editModalDataError-close" src={cross} alt="крест" onClick={onClose} />
</div>
</div>
  );
};

export default ErrorModal;
