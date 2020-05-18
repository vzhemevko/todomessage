import React from 'react';

import themes from 'themes';

const AppStateContext = React.createContext({});

const AppStateProvider = ({ children }) => {
  const [board, setBoard] = React.useState(false);
  const [isBoardInit, setIsBoardInit] = React.useState(false);
  const [isBoardLoaded, setIsBoardLoaded] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [appTheme, setAppTheme] = React.useState(themes[1]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('error');
  const [open, setOpen] = React.useState(false);

  return (
    <AppStateContext.Provider
      value={{
        board,
        setBoard,
        isBoardInit,
        setIsBoardInit,
        isBoardLoaded,
        setIsBoardLoaded,

        cards,
        setCards,

        appTheme,
        setAppTheme,

        isLoading,
        setIsLoading,

        message,
        setMessage,
        type,
        setType,
        open,
        setOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
