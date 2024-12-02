import React, { useState } from 'react';
import './ProfileInfo.css'; // Стили для компонента
import IconAndText from './IconAndText';
import userSearch from '../../svg/user-search.svg';
import sport from '../../svg/sport.svg';
import fingerprint from '../../svg/fingerprint.svg';
import edit from '../../svg/edit-3.svg';
import EditModal from './EditModalSportInfo';

const SportInfo = ({ userData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleClose = () => {
      setIsEditing(false);
    };

  return (
    <div className="profileInfo-edit">
    <IconAndText title="Редактировать данные" isEdit={true} icon={edit} onClick={handleEdit} />
    {isEditing && <EditModal userData={userData} onClose={handleClose} onSave={onSave} />}
    <div className="profileInfo">
      <h1 className="profileInfo-title">Спортивные данные</h1>
      <div className="profileInfo-group">
        <IconAndText title="Спортсмен" icon={userSearch} />
        <IconAndText title={userData.sport} icon={sport} />
        <IconAndText title={userData.coachId} icon={fingerprint} />
      </div>
    </div>
    </div>
  );
};

export default SportInfo;
