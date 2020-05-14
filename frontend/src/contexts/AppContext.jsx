import React, { useState, createContext } from 'react';

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  return (
    <AppStateContext.Provider value={{ cards, setCards }}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
