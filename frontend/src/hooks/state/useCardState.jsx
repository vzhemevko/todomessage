import React from 'react';

import { AppStateContext } from 'contexts/AppContext';

const useCardState = () => {
  const { cards, setCards } = React.useContext(AppStateContext);

  const setCard = (card) => {
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  };

  const getCard = (cardId) => {
    return cards.filter((c) => c.id === cardId)[0];
  };

  const enableTodoModeRetention = (cards) => {
    cards.map((c) => {
      c.todos.map((t) => {
        if (t.mode === undefined) {
          t.mode = 0; //default read mode
        }
      });
    });
    return cards;
  };

  return {
    cards,
    setCards,
    setCard,
    getCard,
    enableTodoModeRetention,
  };
};

export { useCardState };
