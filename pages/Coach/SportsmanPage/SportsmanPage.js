import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SportsmanPage.css";
import CoachSidebar from "../../../components/MenuComponent/CoachSidebar";
import PersonalSportsmanInfo from "./PersonalSportsmanInfo";
import TableCoach from "./TableCoach";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Импортируем axios для запросов

const SportsmanPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]); // Состояние для таблицы

  const navigate = useNavigate();

  // Загружаем данные профиля спортсмена
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/Profile/${id}`);
      setUserData(response.data);
    } catch (error) {
      setError("Ошибка при загрузке данных спортсмена");
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные для таблицы
  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/sportsmanData/datas?sportsmanId=${id}`
      );
      setTableData(response.data); // Сохраняем данные таблицы
    } catch (error) {
      console.error("Ошибка загрузки данных таблицы:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchTableData();
  }, [id]);

  const onClick = () => {
    navigate(`/analysisSportsman/${userData.id}`);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              src={userData.profilePhoto || "https://via.placeholder.com/150"}
              alt={userData.name || "Спортсмен"}
              className="sportsmanProfileForCoach-avatarImage"
            />
          </div>
          <div>
            <h2 className="sportsmanProfileForCoach-headerTitle">
              {userData.name || "Имя не указано"}
            </h2>
            <PersonalSportsmanInfo userData={userData} />
          </div>
        </div>
        <div className="sportsmanProfileForCoach-row">
          {tableData.length > 0 ? (
            <TableCoach data={tableData} />
          ) : (
            <p>Данные для таблицы отсутствуют.</p>
          )}
          <button onClick={onClick}>Аналитика →</button>
        </div>
      </main>
    </div>
  );
};

export default SportsmanPage;
