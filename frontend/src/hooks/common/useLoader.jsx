import { useContext } from 'react';
import { LoaderContext } from 'contexts/LoaderContext';

const useLoader = () => {
  const [isLoading, setIsLoading] = useContext(LoaderContext);

  return { isLoading, setIsLoading };
};

export { useLoader };
