import { useCardState } from 'hooks/state/useCardState';

const useTodoState = () => {
  const { getCard, setCard } = useCardState();

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
    return card;
  };

  return {
    addTodo,
    setTodo,
    removeTodo,
  };
};

export { useTodoState };
