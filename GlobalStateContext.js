import React, { createContext, useContext, useState } from 'react';
import defaultProfilePhoto from './images/user.png'; // Замените на правильный путь к вашему дефолтному фото

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(defaultProfilePhoto); // Используем дефолтное фото

  return (
    <GlobalStateContext.Provider value={{ activeMenu, setActiveMenu, profilePhoto, setProfilePhoto }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
