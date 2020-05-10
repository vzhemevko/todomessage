import React, { useState, createContext } from 'react';

const LoaderContext = createContext([false, () => {}]);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
