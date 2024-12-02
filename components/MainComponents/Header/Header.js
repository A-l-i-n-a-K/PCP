import React, { useState } from 'react';
import './Header.css';
import AuthForm from '../../AuthFormComponents/AuthForm'; // Импортируем компонент AuthForm

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <header className="header">
      <h1>FitQuest</h1>
      <button className="login-button" onClick={handleLoginClick}>Войти</button>

      {showAuthModal && (
        <div className="auth-modal-overlay auth-container">
          <AuthForm closeModal={closeAuthModal} />
        </div>
      )}
    </header>
  );
}

export default Header;
