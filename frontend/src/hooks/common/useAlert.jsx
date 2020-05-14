import { useContext } from 'react';
import { AlertContext } from 'contexts/AlertContext';

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

  const openWarningAlert = (message) => {
    showAlert('warning', message);
  };

  const openSuccessAlert = (message) => {
    showAlert('success', message);
  };

  const openInfoAlert = (message) => {
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
