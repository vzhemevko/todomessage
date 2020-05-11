import { useContext } from 'react';
import { AppContext } from 'contexts/AppCtx';

const useApp = () => {
  const { cards, setCards } = useContext(AppContext);
  return { cards, setCards };
};

export { useApp };
