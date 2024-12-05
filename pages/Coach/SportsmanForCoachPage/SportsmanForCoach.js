import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./SportsmanForCoach.css";
import UserCard from "../../../components/SportsmanForCoachComponents/UserCard";
import CoachSidebar from "../../../components/MenuComponent/CoachSidebar";

const SportsmanForCoach = () => {
  const { id } = useParams(); 
  const [search, setSearch] = useState(""); // Для поиска по имени или фамилии
  const [users, setUsers] = useState([]); // Для хранения спортсменов
  const [loading, setLoading] = useState(true); // Для отслеживания состояния загрузки

  // Функция для загрузки спортсменов по ID тренера
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Profile/coach/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      console.log("Данные о спортсменах:", data); // Добавим лог для проверки данных
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке спортсменов:", error);
      setLoading(false);
    }
  };
  

  // Загружаем данные при монтировании компонента или изменении coachId
  useEffect(() => {
    fetchUsers();
  }, [id]);

  // Фильтрация спортсменов по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.fio.toLowerCase().includes(search.toLowerCase()) // Фильтрация по имени или фамилии
  );
  

  return (
    <div>
      <CoachSidebar />
      <div className="user-list-container">
        <div className="user-list-search-bar">
          <input
            type="text"
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Устанавливаем значение поиска
          />
          <button>Найти</button>
        </div>
        <div className="user-list-user-cards">
  {filteredUsers.map((user) => (
    <UserCard key={user.id} user={user} />
  ))}
</div>

      </div>
    </div>
  );
};

export default SportsmanForCoach;
