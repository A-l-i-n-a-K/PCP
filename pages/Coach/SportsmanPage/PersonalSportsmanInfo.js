import React from "react";
import "./PersonalSportsmanInfo.css";
import profile from "../../../svg/profile.svg";
import age from "../../../svg/birthday-cake.svg";
import email from "../../../svg/email.svg";
import number from "../../../svg/number.svg";
import gender from "../../../svg/gender.svg";
import IconAndText from "../../../components/ProfileComponents/IconAndText";

const PersonalSportsmanInfo = ({ userData }) => {
  const translateGender = (gender) => {
    switch (gender) {
      case 'MALE':
        return 'Мужской';
      case 'FEMALE':
        return 'Женский';
      default:
        return gender;
    }
  };

  return (
    <div className="profileSportsmanInfo-edit">
      <div className="profileSportsmanInfo">
        <div className="profileSportsmanInfo-group">
          <IconAndText title={userData?.fio || "Имя не указано"} icon={profile} />
          <IconAndText title={userData?.age ? `${userData.age} лет` : "Возраст не указан"} icon={age} />
          <IconAndText title={userData?.email || "Email не указан"} icon={email} />
          <IconAndText title={userData?.phone || "Телефон не указан"} icon={number} />
          <IconAndText title={translateGender(userData?.gender) || "Пол не указан"} icon={gender} />
        </div>
      </div>
    </div>
  );
};

export default PersonalSportsmanInfo;
