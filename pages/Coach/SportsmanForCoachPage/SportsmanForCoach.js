import React, { useState } from "react";
import "./SportsmanForCoach.css";
import UserCard from "../../../components/SportsmanForCoachComponents/UserCard";
import CoachSidebar from '../../../components/MenuComponent/CoachSidebar'; 

const SportsmanForCoach = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: "1", // Уникальный идентификатор
      name: "Anna",
      fullName: "Иванова Анна Евгеньевна",
      email: "anna.ivanova@gmail.com",
      phone: "+375 (29) 111-22-33",
      gender: "Женский",
      avatar: "https://via.placeholder.com/150/blue",
    },
    {
      id: "2",
      name: "Alina",
      fullName: "Кубицкая Алина Николаевна",
      email: "kubitskaya.alina@gmail.com",
      phone: "+375333053412",
      gender: "Женский",
      avatar: "https://via.placeholder.com/150/blonde",
    },
    {
      id: "3",
      name: "Dima",
      fullName: "Козлов Дмитрий Иванович",
      email: "dmitry.kozlov@gmail.com",
      phone: "+375 (29) 333-44-55",
      gender: "Мужской",
      avatar: "https://via.placeholder.com/150/gray",
    },
  ];
  

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div><CoachSidebar/>
    <div className="user-list-container">
      <div className="user-list-search-bar">
        <input
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Найти</button>
      </div>
      <div className="user-list-user-cards">
        {filteredUsers.map((user) => (
          <UserCard key={user.email} user={user} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default SportsmanForCoach;
