import { useBoardState } from 'hooks/state/useBoardState';

import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

import { useApi } from 'hooks/api/useApi';

const useBoardApi = () => {
  const {
    setBoardLoaded,
    getBoardNameLocalStorage,
    clearBoardNameLocalStorage,
  } = useBoardState();
  const { setIsLoading } = useLoader();
  const { openErrorAlert } = useAlert();
  const { get, login, logout } = useApi();

  const loadBoard = () => {
    if (!getBoardNameLocalStorage()) return;
    setIsLoading(true);
    get(
      `boards/${getBoardNameLocalStorage()}`,
      (res) => {
        setBoardLoaded(res.data);
        setIsLoading(false);
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Failed to load the board');
        setIsLoading(false);
      }
    );
  };

  const loginBoard = (creds) => {
    setIsLoading(true);
    login(
      creds,
      (res) => {
        setBoardLoaded(res.data);
        setIsLoading(false);
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Sign in failed :(');
        setIsLoading(false);
      }
    );
  };

  const logoutBoard = () => {
    setIsLoading(true);
    logout(
      (res) => {
        clearBoardNameLocalStorage();
        setIsLoading(false);
      },
      () => {
        clearBoardNameLocalStorage();
        openErrorAlert('Sign out failed :(');
        setIsLoading(false);
      }
    );
  };

  return {
    loadBoard,
    loginBoard,
    logoutBoard,
  };
};

export { useBoardApi };
