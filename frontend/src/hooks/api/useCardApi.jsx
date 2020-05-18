import { useCardState } from 'hooks/state/useCardState';
import { useAlert } from 'hooks/common/useAlert';
import { useApi } from 'hooks/api/useApi';

const useCardApi = () => {
  const { setCards, getCard, setCard } = useCardState();
  const { openErrorAlert } = useAlert();
  const { get, put } = useApi();

  const loadCards = () => {
    get(
      'cards',
      (res) => {
        setCards(res.data);
      },
      () => {
        openErrorAlert('Failed to load the cards');
      }
    );
  };

  const updateCard = (cardToUpdate) => {
    const prevCard = getCard(cardToUpdate.cardId);
    setCard(cardToUpdate);
    put(
      'cards',
      cardToUpdate,
      () => {},
      () => {
        setCard(prevCard);
        openErrorAlert('Failed to update the cards');
      }
    );
  };

  return {
    loadCards,
    updateCard,
  };
};

export { useCardApi };
