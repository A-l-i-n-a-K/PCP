import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import cross from '../../svg/cross.svg';

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    signInEmail: "",
    signInPassword: "",
    signInRole: "",
    signInInvalidCredentials: "",
  });
  const [showModal, setShowModal] = useState(false);

  const existingUsers = [
    { name: "Alina", email: "kubitskaya.alina@gmail.com", password: "123456", role: "athlete" },
  ];

  const existingUsers1 = [
    { name: "Alina", email: "kubitskaya.alina@gmail.com", password: "123456", role: "coach" },
  ];

  // Добавляем box-sizing для всех элементов формы через useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .auth-form-container * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "", // Сброс ошибки при изменении поля
    }));

    if (name === 'email') {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: "Email не может быть пустым" }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Введите корректный email" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === 'password') {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: "Пароль должен содержать хотя бы 6 символов" }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    } else if (name === 'role') {
      if (!value) {
        setErrors((prev) => ({ ...prev, role: "Роль не выбрана" }));
      } else {
        setErrors((prev) => ({ ...prev, role: "" }));
      }
    }
  };

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "", // Сброс ошибки при изменении поля
      signInInvalidCredentials: "", // Сбрасываем ошибку неверных данных
    }));

    if (name === 'email' && value) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({ ...prev, signInEmail: "Введите корректный email" }));
      } else {
        setErrors((prev) => ({ ...prev, signInEmail: "" }));
      }
    }

    if (name === 'password' && value) {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, signInPassword: "Пароль должен содержать хотя бы 6 символов" }));
      } else {
        setErrors((prev) => ({ ...prev, signInPassword: "" }));
      }
    }

    if (name === 'role' && value) {
      if (!value) {
        setErrors((prev) => ({ ...prev, signInRole: "Роль не выбрана" }));
      } else {
        setErrors((prev) => ({ ...prev, signInRole: "" }));
      }
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Имя не может быть пустым";
    if (!email) newErrors.email = "Email не может быть пустым";
    if (!password) newErrors.password = "Пароль не может быть пустым";
    if (!role) newErrors.role = "Роль не выбрана";

    if (existingUsers.some(user => user.email === email)) {
      newErrors.email = "Этот email уже существует";
    }
    if (existingUsers.some(user => user.name === name)) {
      newErrors.name = "Это имя уже существует";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowModal(true);
    } else {
      handleSignInClick();
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const { email, password, role } = signInData;
    const newErrors = {};

    if (!email) newErrors.signInEmail = "Email не может быть пустым";
    if (!password) newErrors.signInPassword = "Пароль не может быть пустым";
    if (!role) newErrors.signInRole = "Роль не выбрана";

    const allUsers = [...existingUsers, ...existingUsers1];

    if (email && password && role) { 
      const user = allUsers.find( 
        (user) => user.email === email && user.password === password && user.role === role ); 
      if (!user) { 
        newErrors.signInInvalidCredentials = "Неверный email, пароль или роль"; 
      } 
      else {
      if (role === "athlete") { 
        window.location.href = "/sportsmanProfile"; 
        } 
        else if (role === "coach") { window.location.href = "/coachProfile"; } } }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowModal(true);
    } else {
      console.log("Успешный вход!");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`auth-form-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="auth-form-form-container auth-form-sign-up-container">
        <form className="auth-form-form" onSubmit={handleSignUpSubmit}>
          <h2 className="auth-form-h2-blue">Регистрация</h2>
          <input 
            className="auth-form-input"
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="auth-form-error">{errors.name}</p>}
          <input
           className="auth-form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="auth-form-error">{errors.email}</p>}
          <input
           className="auth-form-input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="auth-form-error">{errors.password}</p>}
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`auth-form-select ${errors.role ? 'error-active' : ''}`}
          >
            <option value="" disabled>Роль</option>
            <option value="athlete">Спортсмен</option>
            <option value="coach">Тренер</option>
          </select>
          {errors.role && <p className="auth-form-error">{errors.role}</p>}
          <button className="auth-form-button" type="submit">Зарегистрироваться</button>
        </form>
      </div>

      <div className="auth-form-form-container auth-form-sign-in-container">
        <form className="auth-form-form" onSubmit={handleSignInSubmit}>
          <h2 className="auth-form-h2-blue">Вход</h2>
          <input
          className="auth-form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={signInData.email}
            onChange={handleSignInInputChange}
          />
          {errors.signInEmail && <p className="auth-form-error">{errors.signInEmail}</p>}
          <input
          className="auth-form-input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={signInData.password}
            onChange={handleSignInInputChange}
          />
          {errors.signInPassword && <p className="auth-form-error">{errors.signInPassword}</p>}
          <select
            name="role"
            value={signInData.role}
            onChange={handleSignInInputChange}
            className={`auth-form-select ${errors.signInRole ? 'error-active' : ''}`}
          >
            <option value="" disabled>Роль</option>
            <option value="athlete">Спортсмен</option>
            <option value="coach">Тренер</option>
          </select>
          {errors.signInRole && <p className="auth-form-error">{errors.signInRole}</p>}
          {errors.signInInvalidCredentials && <p className="auth-form-error">{errors.signInInvalidCredentials}</p>}
          <button className="auth-form-button" type="submit">Войти</button>
        </form>
      </div>

      {showModal && (
        <div className="auth-form-modal">
          <div className="auth-form-modal-content">
            <h3 className="auth-form-h3">Ошибки:</h3>
            <ul>
              {Object.values(errors).map((error, index) => (
                error && <li key={index}>{error}</li>
              ))}
            </ul>
            <img className="auth-form-close" src={cross} alt="крест" onClick={closeModal} />
          </div>
        </div>
      )}

      <div className="auth-form-overlay-container">
        <div className="auth-form-overlay">
          <div className="auth-form-overlay-panel auth-form-overlay-left">
            <h2 className="auth-form-h2">С возвращением</h2>
            <p className="auth-form-p">Чтобы продолжить, пожалуйста, войдите в систему</p>
            <button className="auth-form-button ghost" onClick={handleSignInClick}>
              Вход
            </button>
          </div>
          <div className="auth-form-overlay-panel auth-form-overlay-right">
            <h2 className="auth-form-h2">Привет</h2>
            <p className="auth-form-p">Пожалуйста, зарегистрируйтесь, чтобы продолжить</p>
            <button className="auth-form-button ghost" onClick={handleSignUpClick}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
