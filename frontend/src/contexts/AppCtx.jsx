import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  return (
    <AppContext.Provider value={{ cards, setCards }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
