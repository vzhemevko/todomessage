import React from 'react';

import { AppStateContext } from 'contexts/AppContext';

const useLoader = () => {
  const { isLoading, setIsLoading } = React.useContext(AppStateContext);

  return { isLoading, setIsLoading };
};

export { useLoader };
