import React from 'react';

import { AppStateContext } from 'contexts/AppContext';
import { useCardState } from 'hooks/state/useCardState';
import themes from 'themes';

const BOARD_NAME_KEY = 'TDMSGBDN';

const useBoardState = () => {
  const {
    emptyLoginInputsKeeper,
    loginInputsKeeper,
    setLoginInputsKeeper,
    board,
    setBoard,
    isBoardInit,
    setIsBoardInit,
    isBoardLoaded,
    setIsBoardLoaded,
    setAppTheme,
  } = React.useContext(AppStateContext);
  const { setCards, enableTodoModeRetention } = useCardState();

  const setBoardLoaded = (boardToSet) => {
    if (!boardToSet.name) return;
    window.localStorage.setItem(BOARD_NAME_KEY, boardToSet.name);
    setBoard(boardToSet);
    setCards(enableTodoModeRetention(boardToSet.cards));
    setIsBoardLoaded(true);
    setIsBoardInit(true);
    setAppTheme(themes[boardToSet.theme]);
    setLoginInputsKeeper(emptyLoginInputsKeeper);
  };

  const clearBoardLoaded = () => {
    window.localStorage.removeItem(BOARD_NAME_KEY);
    setIsBoardLoaded(false);
    setIsBoardInit(true);
  };

  const getBoardNameLocalStorage = () => {
    let boardNameLocalStorage = window.localStorage.getItem(BOARD_NAME_KEY);
    return boardNameLocalStorage ? boardNameLocalStorage : '';
  };

  return {
    loginInputsKeeper,
    setLoginInputsKeeper,
    emptyLoginInputsKeeper,
    board,
    isBoardInit,
    setIsBoardInit,
    isBoardLoaded,
    setBoard,
    setBoardLoaded,
    clearBoardLoaded,
    getBoardNameLocalStorage,
  };
};

export { useBoardState };
