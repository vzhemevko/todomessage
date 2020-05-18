import { useBoardState } from 'hooks/state/useBoardState';
import { useAlert } from 'hooks/common/useAlert';
import { useLoader } from 'hooks/common/useLoader';

import { useApi } from 'hooks/api/useApi';

const useBoardApi = () => {
  const {
    board,
    setBoard,
    setIsBoardInit,
    setBoardLoaded,
    getBoardNameLocalStorage,
    clearBoardNameLocalStorage,
  } = useBoardState();
  const { openSuccessAlert, openErrorAlert } = useAlert();
  const { get, put, login, logout } = useApi();
  const { setIsLoading } = useLoader();

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

  const initBoard = () => {
    setIsLoading(true);
    if (!getBoardNameLocalStorage()) {
      setIsBoardInit(true);
      setIsLoading(false);
      return;
    }
    loadBoard();
  };

  const loadBoard = () => {
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

  const updateBoard = (boardToUpdate, successMsg, errorMsg) => {
    const boardPrev = board;
    setBoard(boardToUpdate);
    put(
      'boards',
      boardToUpdate,
      () => {
        openSuccessAlert(successMsg);
      },
      () => {
        setBoard(boardPrev);
        openErrorAlert(errorMsg ? errorMsg : 'Failed to update the board');
      }
    );
  };

  return {
    loginBoard,
    logoutBoard,
    initBoard,
    loadBoard,
    updateBoard,
  };
};

export { useBoardApi };
