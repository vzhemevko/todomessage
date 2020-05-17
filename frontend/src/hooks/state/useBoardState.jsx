import React from 'react';

import { AppStateContext } from 'contexts/AppContext';
import { useCardState } from 'hooks/state/useCardState';

const useBoardState = () => {
  const { board, setBoard, boardLoggedIn, setBoardLoggedIn } = React.useContext(
    AppStateContext
  );
  const { setCards } = useCardState();

  const setBoardLoaded = (boardToSet) => {
    if (!boardToSet.name) return;
    window.localStorage.setItem('TDMSGBDN', boardToSet.name);
    setBoard(boardToSet);
    setCards(boardToSet.cards);
    setBoardLoggedIn(true);
  };

  const clearBoardNameLocalStorage = () => {
    window.localStorage.removeItem('TDMSGBDN');
    setBoardLoggedIn(false);
  };

  const getBoardNameLocalStorage = () => {
    let boardNameLocalStorage = window.localStorage.getItem('TDMSGBDN');
    return boardNameLocalStorage ? boardNameLocalStorage : '';
  };

  return {
    board,
    boardLoggedIn,
    setBoard,
    setBoardLoaded,
    getBoardNameLocalStorage,
    clearBoardNameLocalStorage,
  };
};

export { useBoardState };
