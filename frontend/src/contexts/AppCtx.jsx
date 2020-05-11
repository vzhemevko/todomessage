import React, { useState, createContext } from 'react';

const AppContext = createContext([false, () => {}]);

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppProvider.Provider value={[isLoading, setIsLoading]}>
      {children}
    </AppProvider.Provider>
  );
};

export { AppContext, AppProvider };
