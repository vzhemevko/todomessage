import { useCardState } from 'hooks/state/useCardState';

const useTodoState = () => {
  const { cards, setCards } = useCardState();

  const setCard = (card) => {
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  };

  const getCard = (cardId) => {
    return cards.filter((c) => c.id === cardId)[0];
  };

  const addTodo = (todo) => {
    let card = getCard(todo.cardId);
    card.todos.push(todo);
    setCard(card);
  };

  const setTodo = (todo) => {
    let card = getCard(todo.cardId);
    card.todos = card.todos.map((t) => (t.id === todo.id ? todo : t));
    setCard(card);
  };

  const removeTodo = (todo) => {
    let card = getCard(todo.cardId);
    let index = card.todos.indexOf(todo);
    card.todos.splice(index, 1);
    card.todos.forEach((t, index) => {
      t.position = index;
    });
    setCard(card);
  };

  return {
    addTodo,
    setTodo,
    removeTodo,
  };
};

export { useTodoState };
