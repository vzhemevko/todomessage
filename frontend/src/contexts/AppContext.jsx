import React from 'react';

const AppStateContext = React.createContext({});

const AppStateProvider = ({ children }) => {
  const [board, setBoard] = React.useState({});
  const [boardLoggedIn, setBoardLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  return (
    <AppStateContext.Provider
      value={{
        board,
        setBoard,
        boardLoggedIn,
        setBoardLoggedIn,
        cards,
        setCards,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
