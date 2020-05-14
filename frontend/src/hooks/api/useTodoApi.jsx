import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

import { useTodoState } from 'hooks/state/useTodoState';
import { useCardState } from 'hooks/state/useCardState';
import { useCardApi } from 'hooks/api/useCardApi';

import api from 'services/api';

const useTodoApi = () => {
  const { setIsLoading } = useLoader();
  const { openErrorAlert } = useAlert();
  const { addTodo, setTodo, removeTodo } = useTodoState();
  const { getCard } = useCardState();
  const { updateCard } = useCardApi();

  const createTodo = (todo) => {
    setIsLoading(true);
    api.post(
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
    api.put(
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
    api.remove(
      'todos',
      todo,
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
