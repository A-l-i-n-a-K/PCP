import React, { useState } from 'react';
import './ProfileInfo.css';
import IconAndText from './IconAndText';
import profile from '../../svg/profile.svg';
import age from '../../svg/birthday-cake.svg';
import email from '../../svg/email.svg';
import number from '../../svg/number.svg';
import gender from '../../svg/gender.svg';
import edit from '../../svg/edit-3.svg';
import EditModal from './EditModalPersonalInfo'; 

const PersonalInfo = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="profileInfo-edit">
      <div className="profileInfo">
        <h1 className="profileInfo-title">Личные данные</h1>
        <div className="profileInfo-group">
          <IconAndText title={userData.name} icon={profile} />
          <IconAndText title={userData.age} icon={age} />
          <IconAndText title={userData.email} icon={email} />
          <IconAndText title={userData.phone} icon={number} />
          <IconAndText title={userData.gender} icon={gender} />
        </div>
      </div>
      <IconAndText title="Редактировать данные" isEdit={true} icon={edit} onClick={handleEdit} />
      {isEditing && <EditModal userData={userData} onClose={handleClose} onSave={onSave} />}
    </div>
  );
};

export default PersonalInfo;
