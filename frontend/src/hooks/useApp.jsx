import { useContext } from 'react';
import { AppContext } from 'contexts/AppCtx';

const useApp = () => {
  const { cards, setCards } = useContext(AppContext);

  const setCard = (card) => {
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  };

  const getCard = (cardId) => {
    return cards.filter((c) => c.id === cardId)[0];
  };

  const setTodo = (todo) => {
    let card = getCard(todo.cardId);
    card.todos = card.todos.map((t) => (t.id === todo.id ? todo : t));
    setCard(card);
  };

  const deleteTodoApp = (todo) => {
    let card = getCard(todo.cardId);
    let index = card.todos.indexOf(todo);
    card.todos.splice(index, 1);
    card.todos.forEach((t, index) => {
      t.position = index;
    });
    setCard(card);
  };

  const addNewTodo = (todo) => {
    let card = getCard(todo.cardId);
    card.todos.push(todo);
    setCard(card);
  };

  return {
    cards,
    setCards,
    setCard,
    getCard,
    setTodo,
    deleteTodoApp,
    addNewTodo,
  };
};

export { useApp };
