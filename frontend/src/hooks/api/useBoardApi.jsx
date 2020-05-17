import { useBoardState } from 'hooks/state/useBoardState';

import { useAlert } from 'hooks/common/useAlert';

import { useApi } from 'hooks/api/useApi';

const useBoardApi = () => {
  const {
    board,
    setBoard,
    setBoardLoaded,
    getBoardNameLocalStorage,
    clearBoardNameLocalStorage,
  } = useBoardState();
  const { openErrorAlert } = useAlert();
  const { get, put, login, logout } = useApi();

  const loginBoard = (boardName, boardKey) => {
    login(
      { boardName: boardName, boardKey: boardKey },
      (res) => {
        setBoardLoaded(res.data);
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Sign in failed :(');
      }
    );
  };

  const logoutBoard = () => {
    logout(
      () => {
        clearBoardNameLocalStorage();
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Sign out failed :(');
      }
    );
  };

  const loadBoard = () => {
    if (!getBoardNameLocalStorage()) return;
    get(
      `boards/${getBoardNameLocalStorage()}`,
      (res) => {
        setBoardLoaded(res.data);
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Failed to load the board');
      }
    );
  };

  const updateBoard = (boardToUpdate) => {
    const boardPrev = board;
    setBoard(boardToUpdate);
    put(
      'boards',
      boardToUpdate,
      () => {},
      () => {
        setBoard(boardPrev);
        openErrorAlert('Failed to update the board');
      }
    );
  };

  return {
    loginBoard,
    logoutBoard,
    loadBoard,
    updateBoard,
  };
};

export { useBoardApi };
