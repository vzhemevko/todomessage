import React from 'react';

import themes from 'themes';

const AppStateContext = React.createContext({});

const emptyLoginInputsKeeper = {
  isCreateBoard: false,
  boardName: '',
  boardKey: '',
  confirmBoardKey: '',
};

const defaultAppTheme = themes[2];

const AppStateProvider = ({ children }) => {
  const [loginInputsKeeper, setLoginInputsKeeper] = React.useState(
    emptyLoginInputsKeeper
  );

  const [board, setBoard] = React.useState(false);
  const [isBoardInit, setIsBoardInit] = React.useState(false);
  const [isBoardLoaded, setIsBoardLoaded] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [appTheme, setAppTheme] = React.useState(defaultAppTheme);

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('error');
  const [open, setOpen] = React.useState(false);

  return (
    <AppStateContext.Provider
      value={{
        loginInputsKeeper,
        setLoginInputsKeeper,
        emptyLoginInputsKeeper,

        board,
        setBoard,
        isBoardInit,
        setIsBoardInit,
        isBoardLoaded,
        setIsBoardLoaded,

        cards,
        setCards,

        defaultAppTheme,
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
