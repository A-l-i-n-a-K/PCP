import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserCard.css";
import IconAndText from "../ProfileComponents/IconAndText";
import profile from "../../svg/profile.svg";
import email from "../../svg/email.svg";
import number from "../../svg/number.svg";
import gender from "../../svg/gender.svg";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/sportsman/${user.id}`); // Передаем ID пользователя в URL
  };

  return (
    <div className="user-card" onClick={handleCardClick}>
      <img src={user.avatar} alt={user.name} className="user-avatar" />
      <h3>{user.name}</h3>
      <div className="user-card-group">
        <IconAndText title={user.fullName} icon={profile} />
        <IconAndText title={user.email} icon={email} />
        <IconAndText title={user.phone} icon={number} />
        <IconAndText title={user.gender} icon={gender} />
      </div>
    </div>
  );
};

export default UserCard;
