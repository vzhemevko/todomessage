import { useLoader } from './useLoader';
import { useAlert } from './useAlert';
import { useApp } from './useApp';

import api from 'services/todoMsgApi';

const useApi = () => {
  const { setIsLoading } = useLoader();
  const { openErrorAlert, openSuccessAlert } = useAlert();
  const { cards, setCards } = useApp();

  const loadCards = () => {
    setIsLoading(true);
    api.get(
      'cards',
      (res) => {
        // TODO refactor
        setIsLoading(false);
        if (res.data) {
          console.log(res.data);
          setCards(res.data);
          openSuccessAlert('Loaded all cards ');
          console.log(cards);
        } else {
          openErrorAlert('Failed to load cards');
        }
      },
      () => {
        openErrorAlert('Failed to load cards');
        setIsLoading(false);
      }
    );
  };

  return {
    loadCards,
  };
};

export { useApi };
