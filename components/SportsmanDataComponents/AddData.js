import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddData.css';
import AddComponent from '../AddComponent/AddComponent';

const AddData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    distance: '',
    time: '',
    throwingDistance: '',
    cargoWeight: '',
    lenghtJump: '',
    heightJump: '',
    date: ''
  });

  // Обработчик изменения значений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик отправки данных
  const handleSubmit = () => {
    const newData = [];
  
    // Получаем sportsmanId из ссылки или контекста (если нужно).
    const sportsmanId = id;  // Пример, замените на реальный ID
  
    // Создаем объекты для каждого поля формы
    if (formData.height) {
      newData.push({ sportsmanId, indicator: "Рост", meaning: formData.height, date: formData.date });
    }
    if (formData.weight) {
      newData.push({ sportsmanId, indicator: "Вес", meaning: formData.weight, date: formData.date });
    }
    if (formData.distance) {
      newData.push({ sportsmanId, indicator: "Дистанция", meaning: formData.distance, date: formData.date });
    }
    if (formData.time) {
      newData.push({ sportsmanId, indicator: "Время", meaning: formData.time, date: formData.date });
    }
    if (formData.throwingDistance) {
      newData.push({ sportsmanId, indicator: "Дистанция метания", meaning: formData.throwingDistance, date: formData.date });
    }
    if (formData.cargoWeight) {
      newData.push({ sportsmanId, indicator: "Вес груза", meaning: formData.cargoWeight, date: formData.date });
    }
    if (formData.lenghtJump) {
      newData.push({ sportsmanId, indicator: "Длина прыжка", meaning: formData.lenghtJump, date: formData.date });
    }
    if (formData.heightJump) {
      newData.push({ sportsmanId, indicator: "Высота прыжка", meaning: formData.heightJump, date: formData.date });
    }
  
    // Если есть данные, отправляем их на сервер
    if (newData.length > 0) {
      fetch("http://localhost:8080/sportsmanData/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Данные успешно сохранены:', data);
        // Очистить форму
        setFormData({
          height: '',
          weight: '',
          distance: '',
          time: '',
          throwingDistance: '',
          cargoWeight: '',
          lenghtJump: '',
          heightJump: '',
          date: ''
        });
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных:', error);
      });
    }
  };
  

  return (
    <div className="addData">
      <div className="addData-content">
        <div className="addData-content-row">
          <label>
            Рост, см:
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </label>
          <label>
            Вес, кг:
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addData-content-row">
          <label>
            Дистанция, м:
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
          </label>
          <label>
            Время, с:
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addData-content-row">
          <label>
            Дистанция метания, м:
            <input
              type="number"
              name="throwingDistance"
              value={formData.throwingDistance}
              onChange={handleChange}
            />
          </label>
          <label>
            Вес груза, кг:
            <input
              type="number"
              name="cargoWeight"
              value={formData.cargoWeight}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addData-content-row">
          <label>
            Длина прыжка, м:
            <input
              type="number"
              name="lenghtJump"
              value={formData.lenghtJump}
              onChange={handleChange}
            />
          </label>
          <label>
            Высота прыжка, м:
            <input
              type="number"
              name="heightJump"
              value={formData.heightJump}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addData-content-add-and-date">
          <label>
            Дата:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <AddComponent onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default AddData;
