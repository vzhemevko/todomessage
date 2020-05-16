import { useContext } from 'react';
import { AppStateContext } from 'contexts/AppContext';
import { useCardState } from 'hooks/state/useCardState';

const useBoardState = () => {
  const { board, setBoard } = useContext(AppStateContext);
  const { setCards } = useCardState();

  const setBoardLoaded = (boardToSet) => {
    if (!boardToSet.name) return;
    window.localStorage.setItem('TDMSGBDN', boardToSet.name);
    setBoard(boardToSet);
    setCards(boardToSet.cards);
  };

  const getBoardNameLocalStorage = () => {
    let boardNameLocalStorage = window.localStorage.getItem('TDMSGBDN');
    return boardNameLocalStorage ? boardNameLocalStorage : '';
  };

  const clearBoardNameLocalStorage = () => {
    window.localStorage.removeItem('TDMSGBDN');
  };

  return {
    board,
    setBoard,
    setBoardLoaded,
    getBoardNameLocalStorage,
    clearBoardNameLocalStorage,
  };
};

export { useBoardState };
