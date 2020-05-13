import { useLoader } from './useLoader';
import { useAlert } from './useAlert';
import { useApp } from './useApp';

import api from 'services/todoMsgApi';

const useApi = () => {
  const { setIsLoading } = useLoader();
  const { openErrorAlert, openSuccessAlert } = useAlert();
  const {
    cards,
    setCards,
    setCard,
    getCard,
    deleteTodoApp,
    setTodo,
    addNewTodo,
  } = useApp();

  const loadCards = () => {
    setIsLoading(true);
    api.get(
      'cards',
      (res) => {
        // TODO refactor
        setIsLoading(false);
        if (res.data) {
          setCards(res.data);
          //openSuccessAlert('Loaded all cards ');
        } else {
          //openErrorAlert('Failed to load cards');
        }
      },
      () => {
        openErrorAlert('Failed to load cards');
        setIsLoading(false);
      }
    );
  };

  const loadCard = (cardId) => {
    setIsLoading(true);
    api.get(
      `cards/${cardId}`,
      (res) => {
        // TODO refactor
        setIsLoading(false);
        if (res.data) {
          setCard(res.data);
          //openSuccessAlert(`Loaded card ${res.data.day}`);
        } else {
          openErrorAlert('Failed to load cards');
        }
      },
      () => {
        openErrorAlert('Failed to load cards');
        setIsLoading(false);
      }
    );
  };

  /* const updateCards = () => {
    setIsLoading(true);
    let validCards = cards.filter((c) => c.name);
    api.put(
      'cards',
      validCards,
      (res) => {
        // TODO refactor
        setIsLoading(false);
        openSuccessAlert('Cards updated');
        loadCards();
      },
      () => {
        openErrorAlert('Failed to update cards');
        setIsLoading(false);
      }
    );
  }; */

  const updateCard = (cardId) => {
    setIsLoading(true);
    api.put(
      'cards',
      getCard(cardId),
      (res) => {
        // TODO refactor
        setIsLoading(false);
        //openSuccessAlert('Cards updated');
        //setCard(res.data);
      },
      () => {
        openErrorAlert('Failed to update cards');
        setIsLoading(false);
      }
    );
  };

  const createTodo = (todo) => {
    setIsLoading(true);
    api.post(
      'todos',
      todo,
      (res) => {
        // TODO refactor
        setIsLoading(false);
        addNewTodo(res.data);
        //openSuccessAlert('Todo crated');
      },
      () => {
        openErrorAlert('Failed to crate todo');
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
        // TODO refactor
        setIsLoading(false);
        //setTodo(res.data);
        //openSuccessAlert('Todo crated');
      },
      () => {
        openErrorAlert('Failed to crate todo');
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
        // TODO refactor
        setIsLoading(false);
        deleteTodoApp(todo);
        updateCard(todo.cardId);
        //loadCard(todo.cardId);
        //openSuccessAlert('Todo removed');
      },
      () => {
        openErrorAlert('Failed to remove todo');
        setIsLoading(false);
      }
    );
  };

  return {
    loadCards,
    updateCard,
    deleteTodo,
    createTodo,
    updateTodo,
  };
};

export { useApi };
