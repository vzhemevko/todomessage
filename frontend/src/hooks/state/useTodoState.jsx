import { useCardState } from 'hooks/state/useCardState';

const useTodoState = () => {
  const { getCard, setCard } = useCardState();

  const addTodo = (todo) => {
    todo.mode = 0; //default read mode
    let card = getCard(todo.cardId);
    card.todos.push(todo);
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

  const setTodo = (todo) => {
    let card = getCard(todo.cardId);
    card.todos = card.todos.map((t) => (t.id === todo.id ? todo : t));
    setCard(card);
  };

  const getTodo = (cardId, todoId) => {
    let card = getCard(cardId);
    return card.todos.filter((t) => t.id === todoId)[0];
  };

  return {
    addTodo,
    removeTodo,
    setTodo,
    getTodo,
  };
};

export { useTodoState };
