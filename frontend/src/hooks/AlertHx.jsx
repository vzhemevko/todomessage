import { useContext } from 'react';

import { AlertContext } from 'contexts/AlertCx';

const useAlert = () => {
  const { message, setMessage } = useContext(AlertContext);
  const { type, setType } = useContext(AlertContext);
  const { open, setOpen } = useContext(AlertContext);

  const showAlert = (type, message) => {
    setType(type);
    setMessage(message);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const openErrorAlert = (message) => {
    showAlert('error', message);
  };
  const openSuccessAlert = (message) => {
    showAlert('success', message);
  };
  const openWarningAlert = (message) => {
    showAlert('warning', message);
  };

  return {
    message,
    type,
    open,
    closeAlert,
    openErrorAlert,
    openSuccessAlert,
    openWarningAlert,
  };
};

export { useAlert };
