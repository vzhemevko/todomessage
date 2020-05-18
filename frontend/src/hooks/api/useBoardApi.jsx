import { useBoardState } from 'hooks/state/useBoardState';
import { useAlert } from 'hooks/common/useAlert';
import { useLoader } from 'hooks/common/useLoader';

import { useApi } from 'hooks/api/useApi';

const useBoardApi = () => {
  const {
    board,
    setIsBoardInit,
    setBoardLoaded,
    clearBoardLoaded,
    getBoardNameLocalStorage,
    setLoginInputsKeeper,
    emptyLoginInputsKeeper,
  } = useBoardState();
  const { openSuccessAlert, openWarningAlert, openErrorAlert } = useAlert();
  const { get, post, put, login, logout } = useApi();
  const { setIsLoading } = useLoader();

  const loginBoard = (boardName, boardKey) => {
    login(
      { boardName: boardName, boardKey: boardKey },
      (res) => {
        setBoardLoaded(res.data);
      },
      () => {
        clearBoardLoaded();
        openErrorAlert('Sign in failed :(');
      }
    );
  };

  const logoutBoard = () => {
    logout(
      () => {
        clearBoardLoaded();
      },
      () => {
        clearBoardLoaded();
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
        clearBoardLoaded();
        openErrorAlert('Failed to load the board');
      }
    );
  };

  const createBoard = (boardToCreate) => {
    post(
      'boards',
      boardToCreate,
      () => {
        openSuccessAlert(
          'The Board has been created, please sign in to create a todo message'
        );
        setLoginInputsKeeper(emptyLoginInputsKeeper);
      },
      (error) => {
        let errorMsg = 'Failed to create the board';
        if (error.response.status === 409) {
          errorMsg = 'Board name already exists';
        }
        openWarningAlert(errorMsg);
      }
    );
  };

  const updateBoard = (boardToUpdate, successMsg, errorMsg) => {
    const boardPrev = board;
    setBoardLoaded(boardToUpdate);
    put(
      'boards',
      boardToUpdate,
      () => {
        openSuccessAlert(successMsg);
      },
      () => {
        setBoardLoaded(boardPrev);
        openErrorAlert(errorMsg ? errorMsg : 'Failed to update the board');
      }
    );
  };

  return {
    loginBoard,
    logoutBoard,
    initBoard,
    loadBoard,
    createBoard,
    updateBoard,
  };
};

export { useBoardApi };
