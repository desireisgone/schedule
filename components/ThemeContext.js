import React, { createContext, useContext, useState } from 'react';
import { themes } from '../styles/style';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.green);
  const [bottomTabBackground, setBottomTabBackground] = useState(
    currentTheme.maincolor
  );

  const changeTheme = () => {
    const newTheme = currentTheme === themes.green ? themes.blue : themes.green;
    setCurrentTheme(newTheme);
    setBottomTabBackground(newTheme.maincolor);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, bottomTabBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};
