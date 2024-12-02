import React, { useState } from 'react';
import './AddData.css';
import AddComponent from '../AddComponent/AddComponent';

const AddData = ({ onSave }) => {
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
    // Составляем новый список данных для добавления в таблицу
    const newData = [];

    // Проверяем каждое поле и добавляем данные в newData
    if (formData.height) {
      newData.push({ показатель: "Рост", значение: formData.height, дата: formData.date });
    }
    if (formData.weight) {
      newData.push({ показатель: "Вес", значение: formData.weight, дата: formData.date });
    }
    if (formData.distance) {
      newData.push({ показатель: "Дистанция", значение: formData.distance, дата: formData.date });
    }
    if (formData.time) {
      newData.push({ показатель: "Время", значение: formData.time, дата: formData.date });
    }
    if (formData.throwingDistance) {
      newData.push({ показатель: "Дистанция метания", значение: formData.throwingDistance, дата: formData.date });
    }
    if (formData.cargoWeight) {
      newData.push({ показатель: "Вес груза", значение: formData.cargoWeight, дата: formData.date });
    }
    if (formData.lenghtJump) {
      newData.push({ показатель: "Длина прыжка", значение: formData.lenghtJump, дата: formData.date });
    }
    if (formData.heightJump) {
      newData.push({ показатель: "Высота прыжка", значение: formData.heightJump, дата: formData.date });
    }

    // Если есть какие-либо данные, передаем их в родительский компонент
    if (newData.length > 0) {
      onSave(newData);  // Передаем все данные сразу
    }

    // Очищаем форму после добавления
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
