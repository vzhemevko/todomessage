import { useContext } from 'react';
import { AppStateContext } from 'contexts/AppContext';

const useCardState = () => {
  const { cards, setCards } = useContext(AppStateContext);

  const setCard = (card) => {
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  };

  const getCard = (cardId) => {
    return cards.filter((c) => c.id === cardId)[0];
  };

  return {
    cards,
    setCards,
    setCard,
    getCard,
  };
};

export { useCardState };
