import React, { useState, createContext } from 'react';

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('error');
  const [open, setOpen] = useState(false);

  return (
    <AlertContext.Provider
      value={{ message, setMessage, type, setType, open, setOpen }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
