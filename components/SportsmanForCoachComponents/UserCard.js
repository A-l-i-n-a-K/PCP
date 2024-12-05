import React from "react";
import { useNavigate,useParams } from "react-router-dom";
import "./UserCard.css";
import IconAndText from "../ProfileComponents/IconAndText";
import profile from "../../svg/profile.svg";
import email from "../../svg/email.svg";
import number from "../../svg/number.svg";
import gender from "../../svg/gender.svg";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const mapEnumToGender = (genderEnum) => {
    const sportMapping = {
      MALE: 'Мужской',
      FEMALE: 'Женский',
    };
    return sportMapping[genderEnum] || genderEnum; // Возвращаем читаемое название или исходное значение
  };

  const handleCardClick = () => {
    navigate(`/sportsman/${id}/${user.id}`); // Перенаправляем на страницу с детализированным профилем
  };

  return (
    <div className="user-card" onClick={handleCardClick}>
      <img src={user.avatar} alt={user.name} className="user-avatar" />
      <h3>{user.name}</h3>
      <div className="user-card-group">
        <IconAndText title={user.fio} icon={profile} />
        <IconAndText title={user.email} icon={email} />
        <IconAndText title={user.phone} icon={number} />
        <IconAndText title={mapEnumToGender(user.gender)} icon={gender} />
      </div>
    </div>
  );
};

export default UserCard;
