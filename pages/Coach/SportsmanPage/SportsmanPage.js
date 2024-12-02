import React from "react";
import { useParams } from "react-router-dom";
import "./SportsmanPage.css";
import CoachSidebar from "../../../components/MenuComponent/CoachSidebar";
import PersonalSportsmanInfo from "./PersonalSportsmanInfo";
import TableCoach from "./TableCoach";
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    id: "1",
    login: "Anna",
    name: "Иванова Анна Евгеньевна",
    age: 25,
    email: "anna.ivanova@gmail.com",
    phone: "+375 (29) 111-22-33",
    gender: "Женский",
    sport: "Плавание",
    coachId: "123",
    profilePhoto: "https://via.placeholder.com/150/blue",
    tableData: [
      { показатель: "Скорость", значение: "10", дата: "2024-12-01" },
      { показатель: "Сила", значение: "200", дата: "2024-11-25" },
    ],
  },
  {
    id: "2",
    login: "Alina",
    name: "Кубицкая Алина Николаевна",
    age: 28,
    email: "kubitskaya.alina@gmail.com",
    phone: "+375333053412",
    gender: "Женский",
    sport: "Легкая атлетика",
    coachId: "124",
    profilePhoto: "https://via.placeholder.com/150/blonde",
    tableData: [
      { показатель: "Скорость", значение: "15", дата: "2024-12-02" },
      { показатель: "Сила", значение: "180", дата: "2024-11-20" },
    ],
  },
  {
    id: "3",
    login: "Dima",
    name: "Козлов Дмитрий Иванович",
    age: 30,
    email: "dmitry.kozlov@gmail.com",
    phone: "+375 (29) 333-44-55",
    gender: "Мужской",
    sport: "Футбол",
    coachId: "125",
    profilePhoto: "https://via.placeholder.com/150/gray",
    tableData: [
      { показатель: "Скорость", значение: "20", дата: "2024-11-30" },
      { показатель: "Сила", значение: "210", дата: "2024-11-28" },
    ],
  },
];

const SportsmanPage = () => {
  const { id } = useParams();
  const userData = mockData.find((user) => user.id === id);
  
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/analysisSportsman/${userData.id}`);
  };

  if (!userData) {
    return <p>Спортсмен не найден</p>;
  }

  return (
    <div className="sportsmanProfileForCoach-page">
      <CoachSidebar />
      <main className="sportsmanProfileForCoach-mainContent">
        <div className="sportsmanProfileForCoach-header">
          <div className="sportsmanProfileForCoach-avatar">
            <img
              src={userData.profilePhoto}
              alt={userData.login}
              className="sportsmanProfileForCoach-avatarImage"
            />
          </div>
          <div>
            <h2 className="sportsmanProfileForCoach-headerTitle">
              {userData.login}
            </h2>
            <PersonalSportsmanInfo userData={userData} />
          </div>
        </div>
        <div className="sportsmanProfileForCoach-row">
          <TableCoach data={userData.tableData} />
          <button onClick={onClick}>Аналитика →</button>
        </div>
      </main>
    </div>
  );
};

export default SportsmanPage;
