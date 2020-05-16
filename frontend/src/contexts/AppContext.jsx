import React, { useState, createContext } from 'react';

const AppStateContext = createContext({});

const AppStateProvider = ({ children }) => {
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState([]);

  return (
    <AppStateContext.Provider value={{ board, setBoard, cards, setCards }}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
