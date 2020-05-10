import { useContext } from 'react';
import { LoaderContext } from 'contexts/LoaderCx';

const useLoader = (loading) => {
  const [isLoading, setIsLoading] = useContext(LoaderContext);

  return [isLoading, setIsLoading];
};

export { useLoader };
