import { useCardState } from 'hooks/state/useCardState';

import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

import api from 'services/api';

const useCardApi = () => {
  const { setCards, setCard } = useCardState();
  const { setIsLoading } = useLoader();
  const { openErrorAlert } = useAlert();

  const loadCards = () => {
    setIsLoading(true);
    api.get(
      'cards',
      (res) => {
        setCards(res.data);
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to load cards');
        setIsLoading(false);
      }
    );
  };

  const loadCard = (cardId) => {
    setIsLoading(true);
    api.get(
      `cards/${cardId}`,
      (res) => {
        setCard(res.data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        openErrorAlert('Failed to load cards');
      }
    );
  };

  const updateCard = (card) => {
    setIsLoading(true);
    api.put(
      'cards',
      card,
      (res) => {
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to update cards');
        setIsLoading(false);
      }
    );
  };

  return {
    loadCards,
    loadCard,
    updateCard,
  };
};

export { useCardApi };
