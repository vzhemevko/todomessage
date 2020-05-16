import { useCardState } from 'hooks/state/useCardState';

import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

import { useApi } from 'hooks/api/useApi';

const useCardApi = () => {
  const { setCards, setCard } = useCardState();
  const { setIsLoading } = useLoader();
  const { openErrorAlert } = useAlert();
  const { get, put } = useApi();

  const loadCards = () => {
    setIsLoading(true);
    get(
      'cards',
      (res) => {
        setCards(res.data);
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to load the cards');
        setIsLoading(false);
      }
    );
  };

  const loadCard = (cardId) => {
    setIsLoading(true);
    get(
      `cards/${cardId}`,
      (res) => {
        setCard(res.data);
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to load the cards');
        setIsLoading(false);
      }
    );
  };

  const updateCard = (card) => {
    setIsLoading(true);
    put(
      'cards',
      card,
      (res) => {
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to update the cards');
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
