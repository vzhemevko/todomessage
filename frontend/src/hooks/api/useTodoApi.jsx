import { useTodoState } from 'hooks/state/useTodoState';
import { useCardApi } from 'hooks/api/useCardApi';
import { useApi } from 'hooks/api/useApi';
import { useAlert } from 'hooks/common/useAlert';

const useTodoApi = () => {
  const { openErrorAlert } = useAlert();
  const { todo, addTodo, setTodo, removeTodo } = useTodoState();
  const { updateCard } = useCardApi();
  const { post, put, remove } = useApi();

  const createTodo = (todoToCreate) => {
    post(
      'todos',
      todoToCreate,
      (res) => {
        addTodo(res.data);
      },
      () => {
        openErrorAlert('Failed to create a new todo');
      }
    );
  };

  const updateTodo = (todoToUpdate) => {
    const prevTodo = todo;
    setTodo(todoToUpdate);
    put(
      'todos',
      todoToUpdate,
      () => {},
      () => {
        setTodo(prevTodo);
        openErrorAlert('Failed to update the todo');
      }
    );
  };

  const deleteTodo = (todoToDelete) => {
    remove(
      `todos/${todoToDelete.id}`,
      () => {
        const cardToUpdate = removeTodo(todoToDelete);
        updateCard(cardToUpdate);
      },
      () => {
        openErrorAlert('Failed to delete the todo');
      }
    );
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export { useTodoApi };
