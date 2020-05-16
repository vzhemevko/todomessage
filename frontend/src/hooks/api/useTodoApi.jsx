import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

import { useTodoState } from 'hooks/state/useTodoState';
import { useCardState } from 'hooks/state/useCardState';
import { useCardApi } from 'hooks/api/useCardApi';

import { useApi } from 'hooks/api/useApi';

const useTodoApi = () => {
  const { setIsLoading } = useLoader();
  const { openErrorAlert } = useAlert();
  const { addTodo, setTodo, removeTodo } = useTodoState();
  const { getCard } = useCardState();
  const { updateCard } = useCardApi();
  const { post, put, remove } = useApi();

  const createTodo = (todo) => {
    setIsLoading(true);
    post(
      'todos',
      todo,
      (res) => {
        addTodo(res.data);
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to create a new todo');
        setIsLoading(false);
      }
    );
  };

  const updateTodo = (todo) => {
    setIsLoading(true);
    put(
      'todos',
      todo,
      (res) => {
        setTodo(res.data);
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to update the todo');
        setIsLoading(false);
      }
    );
  };

  const deleteTodo = (todo) => {
    setIsLoading(true);
    remove(
      `todos/${todo.id}`,
      (res) => {
        removeTodo(todo);
        updateCard(getCard(todo.cardId));
        setIsLoading(false);
      },
      () => {
        openErrorAlert('Failed to delete the todo');
        setIsLoading(false);
      }
    );
  };

  return {
    createTodo,
    deleteTodo,
    updateTodo,
  };
};

export { useTodoApi };
