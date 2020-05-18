import React from 'react';

import { AppStateContext } from 'contexts/AppContext';

const useAlert = () => {
  const {
    message,
    setMessage,
    type,
    setType,
    open,
    setOpen,
  } = React.useContext(AppStateContext);

  const showAlert = (type, message) => {
    setType(type);
    setMessage(message);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const openErrorAlert = (message) => {
    if (!message) return;
    showAlert('error', message);
  };

  const openWarningAlert = (message) => {
    if (!message) return;
    showAlert('warning', message);
  };

  const openSuccessAlert = (message) => {
    if (!message) return;
    showAlert('success', message);
  };

  const openInfoAlert = (message) => {
    if (!message) return;
    showAlert('info', message);
  };

  return {
    message,
    type,
    open,
    closeAlert,
    openErrorAlert,
    openWarningAlert,
    openSuccessAlert,
    openInfoAlert,
  };
};

export { useAlert };
