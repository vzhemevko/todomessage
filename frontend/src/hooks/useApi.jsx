import { useContext } from 'react';
import { useLoader } from './useLoader';
import { useAlert } from './useAlert';

import api from 'services/todoMsgApi';

const useApi = () => {
  const { setIsLoading } = useLoader();
  const { openErrorAlert, openSuccessAlert } = useAlert();

  const getAllCards = () => {
    setIsLoading(true);
    api.get(
      'boards',
      (res) => {
        openSuccessAlert('Loaded all cards ');
        setIsLoading(false);
        console.log(res.data);
      },
      () => {
        openErrorAlert('Failed to load cards');
        setIsLoading(false);
      }
    );
  };

  return {
    getAllCards,
  };
};

export { useApi };
